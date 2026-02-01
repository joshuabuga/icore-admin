import { PrismaClient, UserRole } from './db/generated/client';

const prisma = new PrismaClient();

// All available permissions in the system
const ALL_PERMISSIONS = [
    'players:read',
    'players:write',
    'cashflow:read',
    'cashflow:write',
    'batches:read',
    'batches:approve',
    'batches:process',
    'promos:read',
    'promos:write',
    'games:read',
    'games:write',
    'staff:read',
    'staff:write',
    'summary:read',
    'bonus:read',
    'bonus:write',
] as const;

// Role-based default permissions
const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
    user: [],
    cs: [
        'players:read',
        'players:write',
        'summary:read',
        'cashflow:read',
    ],
    marketing: [
        'promos:read',
        'promos:write',
        'bonus:read',
        'bonus:write',
        'summary:read',
        'players:read',
    ],
    finance: [
        'cashflow:read',
        'cashflow:write',
        'batches:read',
        'batches:approve',
        'batches:process',
        'summary:read',
        'players:read',
    ],
    admin: ALL_PERMISSIONS.filter((p) => p !== 'staff:write'),
    super_admin: [...ALL_PERMISSIONS],
};

async function main() {
    console.log('🌱 Starting seed...\n');

    // Clear existing permissions
    const deleted = await prisma.permissions.deleteMany();
    console.log(`🗑️  Cleared ${deleted.count} existing permissions\n`);

    // Get all users
    const users = await prisma.user.findMany();
    console.log(`👥 Found ${users.length} users\n`);

    // Seed permissions for each user based on their role
    for (const user of users) {
        const permissions = ROLE_PERMISSIONS[user.role] || [];

        if (permissions.length === 0) {
            console.log(`⏭️  ${user.email} (${user.role}) - no permissions to add`);
            continue;
        }

        // Create permission records for this user
        const created = await prisma.permissions.createMany({
            data: permissions.map((permission) => ({
                user_id: user.id,
                permission,
            })),
        });

        console.log(
            `✅ ${user.email} (${user.role}) - added ${created.count} permissions`
        );
    }

    // Show final count
    const totalPermissions = await prisma.permissions.count();
    console.log(`\n📊 Total permissions in database: ${totalPermissions}`);

    console.log('\n✅ Seed completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
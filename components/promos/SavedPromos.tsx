'use client'

import { Promos } from "@/types/crediting";
import { Pen, Delete, Search, Plus, Eye, Calendar, DollarSign } from "lucide-react"
import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

export default function SavedPromos() {
    const [loading, setLoading] = useState(false);
    const [promos, setPromos] = useState<Promos[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadPromos = async () => {
            setLoading(true);
            try {
                const data = await fetchPromos();
                setPromos(data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load promos");
            } finally {
                setLoading(false);
            }
        };

        loadPromos();
    }, []);

    const fetchPromos = async (): Promise<Promos[]> => {
        const response = await fetch('/api/promos');
        if (!response.ok) {
            throw new Error('Failed to fetch promos');
        }
        const data = await response.json();
        
        // Map database fields to match our Promos type
        return data.map((promo: any) => ({
            ...promo,
            terms_and_conditions: promo.term_and_conditions || promo.terms_and_conditions,
            start: new Date(promo.start),
            end: promo.end ? new Date(promo.end) : new Date(),
        }));
    };

    const handleDeletePromo = async (promoId: string) => {
        if (!confirm("Are you sure you want to delete this promo?")) {
            return;
        }

        try {
            const response = await fetch(`/api/promos/${promoId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete promo');
            }

            setPromos(prev => prev.filter(promo => promo.id !== promoId));
            toast.success("Promo deleted successfully");
        } catch (error) {
            console.error('Error deleting promo:', error);
            toast.error("Failed to delete promo");
        }
    };

    // Filter promos based on search term
    const filteredPromos = useMemo(() => {
        if (!searchTerm.trim()) return promos;
        
        const search = searchTerm.toLowerCase();
        return promos.filter(promo => 
            promo.title.toLowerCase().includes(search) ||
            promo.description.toLowerCase().includes(search) ||
            (promo.amount && promo.amount.toString().includes(search))
        );
    }, [promos, searchTerm]);

    return (
        <div className="space-y-6 p-4 sm:p-6 lg:p-10">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Saved Promotions</h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Manage and organize your promotional campaigns
                    </p>
                </div>
                <Link href="/promos/create" className="w-full sm:w-auto">
                    <Button className="gap-2 w-full sm:w-auto">
                        <Plus className="h-4 w-4" />
                        Create New Promo
                    </Button>
                </Link>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Search promos by title, description, or amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Promos</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{promos.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Promos</CardTitle>
                        <Badge variant="secondary" className="h-4 w-4 rounded-full p-0" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {promos.filter(p => p.is_active).length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Search Results</CardTitle>
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{filteredPromos.length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Promos Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-40 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : filteredPromos.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Search className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold">No promos found</h3>
                        <p className="text-muted-foreground text-center">
                            {searchTerm.trim() 
                                ? "Try adjusting your search terms or create a new promo."
                                : "Get started by creating your first promotional campaign."
                            }
                        </p>
                        {!searchTerm.trim() && (
                            <Link href="/promos/create" className="mt-4">
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Create Your First Promo
                                </Button>
                            </Link>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPromos.map((promo) => (
                        <Card key={promo.id} className="overflow-hidden">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1 flex-1">
                                        <CardTitle className="text-lg line-clamp-1">
                                            {promo.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {promo.description}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={promo.is_active ? "default" : "secondary"}>
                                        {promo.is_active ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Image Preview */}
                                {promo.image && (
                                    <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
                                        <Image
                                            width={400}
                                            height={300}
                                            src={promo.image}
                                            alt={promo.title}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                )}

                                {/* Promo Details */}
                                <div className="space-y-2">
                                    {promo.amount && (
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">
                                                KES {promo.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {format(new Date(promo.start), 'MMM dd')} - {' '}
                                            {promo.end ? format(new Date(promo.end), 'MMM dd, yyyy') : 'No end date'}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-between pt-2">
                                    <Link href={`/promos/${promo.id}`}>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Pen className="h-3 w-3" />
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button 
                                        variant="destructive" 
                                        size="sm" 
                                        className="gap-2"
                                        onClick={() => handleDeletePromo(promo.id)}
                                    >
                                        <Delete className="h-3 w-3" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
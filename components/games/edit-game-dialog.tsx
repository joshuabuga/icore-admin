'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Game, GameCategory, GameDetail } from '@/types/games';
import { Gamepad2, ImagePlus, Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  game: Game | null;
  onSave: (id: string, data: Partial<GameDetail>, thumbnailFile?: File) => Promise<void>;
  isLoading?: boolean;
}

// Inner form component that initializes state from game prop
function EditGameForm({
  game,
  onSave,
  onCancel,
  isLoading,
}: {
  game: Game;
  onSave: (id: string, data: Partial<GameDetail>, thumbnailFile?: File) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [priority, setPriority] = useState(game.priority);
  const [tags, setTags] = useState(game.tags || '');
  const [isOffered, setIsOffered] = useState(game.is_offered);
  const [category, setCategory] = useState<GameCategory>(game.category);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    await onSave(
      game.id.toString(),
      {
        priority,
        tags,
        is_offered: isOffered,
        category,
      },
      thumbnailFile || undefined,
    );
  };

  const incrementPriority = () => setPriority((p) => p + 1);
  const decrementPriority = () => setPriority((p) => Math.max(0, p - 1));

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Edit Game</AlertDialogTitle>
        <AlertDialogDescription>
          Update game settings and visibility.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <div className="space-y-6 py-4">
        {/* Game Preview Card */}
        <div className="rounded-lg border overflow-hidden">
          <div className="aspect-video relative bg-muted group">
            {thumbnailPreview || game.thumbnail ? (
              <Image
                src={thumbnailPreview || game.thumbnail}
                alt={game.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 500px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Gamepad2 className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            {/* Thumbnail upload overlay */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <div className="flex flex-col items-center gap-1 text-white">
                <ImagePlus className="h-8 w-8" />
                <span className="text-sm font-medium">Change Thumbnail</span>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="hidden"
            />
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-lg">{game.name}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{game.provider}</Badge>
              <Badge variant="outline">{game.type}</Badge>
              <Badge variant={game.status === 'Active' ? 'default' : 'destructive'}>
                {game.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Code: {game.code} | ID: {game.id}
            </p>
          </div>
        </div>

        {/* Editable Fields */}
        <div className="space-y-4">
          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={decrementPriority}
                disabled={priority <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="priority"
                type="number"
                value={priority}
                onChange={(e) => setPriority(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-24 text-center"
                min={0}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={incrementPriority}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Higher priority games appear first in listings.
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as GameCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casino">Casino</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., popular, new, featured"
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated tags for filtering and search.
            </p>
          </div>

          {/* Is Offered Toggle */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="is_offered" className="text-base">
                Offered to Players
              </Label>
              <p className="text-sm text-muted-foreground">
                When enabled, this game is visible and playable by users.
              </p>
            </div>
            <Switch
              id="is_offered"
              checked={isOffered}
              onCheckedChange={setIsOffered}
            />
          </div>
        </div>
      </div>

      <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </AlertDialogFooter>
    </>
  );
}

export function EditGameDialog({
  open,
  onOpenChange,
  game,
  onSave,
  isLoading = false,
}: EditGameDialogProps) {
  const handleCancel = () => onOpenChange(false);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {game && (
          <EditGameForm
            key={game.id}
            game={game}
            onSave={onSave}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateTimePickerProps {
    value: string | null;
    onChange: (iso: string | null) => void;
    placeholder?: string;
    id?: string;
    disabled?: boolean;
}

export function DateTimePicker({
    value,
    onChange,
    placeholder = 'Pick a date',
    id,
    disabled,
}: DateTimePickerProps) {
    const date = value ? new Date(value) : undefined;
    const time = date ? format(date, 'HH:mm') : '00:00';

    const setDate = (d: Date | undefined) => {
        if (!d) {
            onChange(null);
            return;
        }
        const [h, m] = time.split(':').map(Number);
        const next = new Date(d);
        next.setHours(h ?? 0, m ?? 0, 0, 0);
        onChange(next.toISOString());
    };

    const setTime = (t: string) => {
        if (!date) return;
        const [h, m] = t.split(':').map(Number);
        const next = new Date(date);
        next.setHours(h ?? 0, m ?? 0, 0, 0);
        onChange(next.toISOString());
    };

    return (
        <div className="flex gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id={id}
                        type="button"
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            'flex-1 justify-start text-left font-normal',
                            !date && 'text-muted-foreground',
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>{placeholder}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        autoFocus
                    />
                </PopoverContent>
            </Popover>
            <Input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                disabled={disabled || !date}
                className="w-[7.5rem]"
                aria-label="Time"
            />
            {date && !disabled && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onChange(null)}
                    aria-label="Clear"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}

'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Upload, X } from 'lucide-react';
import { useToast } from '@/lib/utils/toast';

interface ImageUploadProps {
  initialImage?: string | null;
  userName?: string;
  onImageChange?: (imageDataUrl: string | null) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function ImageUpload({
  initialImage,
  userName,
  onImageChange,
  size = 'md'
}: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Sync internal state with prop changes
  useEffect(() => {
    setImage(initialImage || null);
  }, [initialImage]);

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.title('Invalid file type', {
        description: 'Please upload an image file (JPEG, PNG, etc.)',
        variant: 'destructive'
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.title('File too large', {
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      setImage(imageDataUrl);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userProfileImage', imageDataUrl);
      }

      // Notify parent component
      if (onImageChange) {
        onImageChange(imageDataUrl);
      }

      toast.title('Profile picture updated', {
        description: 'Your profile picture has been updated successfully'
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);

    // Remove from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userProfileImage');
    }

    // Notify parent component
    if (onImageChange) {
      onImageChange(null);
    }

    toast.title('Profile picture removed', {
      description: 'Your profile picture has been removed'
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Avatar className={`${sizeClasses[size]} border-4`} style={{ borderColor: 'rgba(0, 176, 155, 0.2)' }}>
          {image ? (
            <AvatarImage src={image} alt="Profile" />
          ) : null}
          <AvatarFallback className="text-white" style={{ background: 'linear-gradient(to right, #00b09b, #96c93d)' }}>
            {userName ? userName[0].toUpperCase() : <User className={size === 'sm' ? 'h-6 w-6' : 'h-12 w-12'} />}
          </AvatarFallback>
        </Avatar>

        {isHovering && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                onClick={triggerFileInput}
              >
                <Upload className="h-4 w-4" />
              </Button>

              {image && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <Button
        variant="ghost"
        size="sm"
        className="mt-2 text-xs text-muted-foreground"
        onClick={triggerFileInput}
      >
        {image ? 'Change Photo' : 'Upload Photo'}
      </Button>
    </div>
  );
}

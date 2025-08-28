interface AdPlacementProps {
  slot: string;
  className?: string;
  format?: 'banner' | 'square' | 'rectangle' | 'leaderboard';
}

export function AdPlacement({ slot, className = '', format = 'banner' }: AdPlacementProps) {
  const formatStyles = {
    banner: 'w-full h-24 max-w-[728px]',
    square: 'w-64 h-64',
    rectangle: 'w-80 h-60',
    leaderboard: 'w-full h-24 max-w-[728px]'
  };

  return (
    <div className={`${formatStyles[format]} ${className}`}>
      <div className="w-full h-full bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg border border-border/30 flex items-center justify-center backdrop-blur-sm">
        <div className="text-center text-muted-foreground">
          <div className="text-xs font-medium opacity-60">Advertisement Space</div>
          <div className="text-xs opacity-40 mt-1">{slot}</div>
        </div>
      </div>
    </div>
  );
}
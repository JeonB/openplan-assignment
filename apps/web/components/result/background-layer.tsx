import Image from 'next/image';

interface BackgroundLayerProps {
  imageUrl: string | null;
}

/**
 * Background layer component for Result page
 * - Displays blurred photo as background
 * - Applies gradient overlay that fades from top to bottom
 */
export default function BackgroundLayer({ imageUrl }: BackgroundLayerProps) {
  if (!imageUrl) {
    return <div className="fixed inset-0 -z-10 bg-gray-900" />;
  }

  return (
    <div className="fixed inset-0 -z-10">
      {/* Background Image with Grayscale and Blur - Figma specs applied */}
      <div className="absolute inset-0 overflow-hidden bg-gray-50">
        <div className="h-full w-full opacity-30">
          <Image src={imageUrl} alt="" fill className="scale-[2] object-cover blur-[5px] grayscale" sizes="100vw" />
        </div>
      </div>

      {/* Dark Overlay - Figma spec: rgba(0, 0, 0, 0.30) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Gradient Overlay - Figma spec: linear-gradient(180deg, #D9D9D9 0%, rgba(217, 217, 217, 0.00) 100%) */}
      <div className="absolute inset-0 bg-linear-to-t from-[#D9D9D9] to-transparent" />
    </div>
  );
}

import type { PhotoData } from '../../lib/types/photo.types';
import { BodyText, BodyTextMuted, LinkText } from '../ui/typography';

interface InfoCardsProps {
  photoData: PhotoData | null;
}

interface FieldProps {
  label: string;
  value: string | number | null;
  isLink?: boolean;
}

function Field({ label, value, isLink }: FieldProps) {
  return (
    <div className="flex flex-col">
      <BodyText className="text-black-100">{label}</BodyText>
      {isLink && value ? (
        <LinkText href={String(value)} target="_blank" rel="noopener noreferrer" className="text-black-100">
          {String(value)}
        </LinkText>
      ) : (
        <BodyTextMuted className="text-black-100">
          {typeof value === 'number' ? value.toLocaleString() : (value ?? '-')}
        </BodyTextMuted>
      )}
    </div>
  );
}

const cardStyle = 'rounded-2xl border border-black/[0.01] bg-white p-5 w-full';

/**
 * 사진 메타데이터를 표시하는 Info Cards 컴포넌트
 * - 반응형 레이아웃: 모바일에서는 세로, 태블릿 이상에서는 가로 배치
 * - 세 개의 카드 그룹: id/author, width/height, url/download_url
 */
export default function InfoCards({ photoData }: InfoCardsProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* ID & Author - 모바일: 세로 / 태블릿 이상: 가로 배치 */}
      <div className={cardStyle}>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Field label="id" value={photoData?.id ?? null} />
          </div>
          <div className="flex-1">
            <Field label="author" value={photoData?.author ?? null} />
          </div>
        </div>
      </div>

      {/* Width & Height - 모바일: 세로 / 태블릿 이상: 가로 배치 */}
      <div className={cardStyle}>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Field label="width" value={photoData?.width ?? null} />
          </div>
          <div className="flex-1">
            <Field label="height" value={photoData?.height ?? null} />
          </div>
        </div>
      </div>

      {/* URL & Download URL - 모든 해상도에서 세로 배치 */}
      <div className={cardStyle}>
        <div className="flex flex-col gap-4">
          <Field label="url" value={photoData?.url ?? null} isLink />
          <Field label="download_url" value={photoData?.download_url ?? null} isLink />
        </div>
      </div>
    </div>
  );
}

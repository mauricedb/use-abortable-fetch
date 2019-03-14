import mediaTyper from 'media-typer';
import contentType from 'content-type';

export default function isJSON(contentTypeHeader: string | null): boolean {
  if (contentTypeHeader) {
    const ct = contentType.parse(contentTypeHeader);

    const mediaType = mediaTyper.parse(ct.type);

    if (mediaType.subtype === 'json') {
      return true;
    }

    if (mediaType.suffix === 'json') {
      return true;
    }

    if (mediaType.suffix && /\bjson\b/i.test(mediaType.suffix)) {
      return true;
    }

    if (mediaType.subtype && /\bjson\b/i.test(mediaType.subtype)) {
      return true;
    }
  }
  return false;
}

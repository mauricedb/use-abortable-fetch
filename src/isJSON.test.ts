import isJSON from './isJSON';

// From https://www.iana.org/assignments/media-types/media-types.xhtml#text

test.each([
  'application/json',
  'application/activity+json',
  'application/alto-costmap+json',
  'application/calendar+json',
  'application/dns+json',
  'application/geo+json',
  'application/geo+json-seq',
  'application/json-seq',
  'application/problem+json',
  'application/vnd.apache.thrift.json',
  'application/vnd.api+json',
  'application/vnd.pagerduty+json',
  'application/vnd.restful+json',
  'text/json',
  'model/gltf+json'
])('Content type "%s" should be JSON', (contentType: string) => {
  expect(isJSON(contentType)).toBeTruthy();
});

test.each([
  '',
  null,
  undefined,
  'application/xml',
  'application/activity+xml',
  'text/xml',
  'text/html'
])(
  'Content type "%s" should not be JSON',
  (contentType: string | null | undefined) => {
    expect(isJSON(contentType)).toBeFalsy();
  }
);

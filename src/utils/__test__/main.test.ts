import {formatTime} from '../main'

describe('formatTime function', () => {
  test('correctly formats the time', () => {
    const timeString: string = '2024-02-26T10:30:00';
    const expectedFormat: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    const formattedTime: string = formatTime(timeString, expectedFormat);
    expect(formattedTime).toEqual('February 26 2024 at 10:30 AM');
  });
});
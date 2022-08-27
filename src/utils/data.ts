export interface GenreOption {
  readonly value: string;
  readonly label: string;
}

export const genreOptions: readonly GenreOption[] = [
  { value: 'Hip Hop', label: 'Hip Hop' },
  { value: 'Rock', label: 'Rock' },
  { value: 'Jazz', label: 'Jazz' },
  { value: 'RnB', label: 'RnB' },
]

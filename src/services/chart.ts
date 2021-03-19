export const getDescriptionByType = (type: 'artists' | 'tracks') =>
  ({
    artists: 'Most listened artist',
    tracks: 'Most listened track',
  }[type])

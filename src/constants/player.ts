const PLAYER_DETAILS = new Map<Player, { avatar: string }>([
  ['tim', { avatar: 'plankton_512px' }],
  ['jan', { avatar: 'patrick_star_512px' }],
  ['ole', { avatar: 'spongebob_squarepants_512px' }],
  ['hannes', { avatar: 'squidward_tentacles_512px' }],
  ['louisa', { avatar: 'sandy_cheeks_512px' }],
  ['sonstige', { avatar: 'gary_the_snail_512px' }]
]);

const PLAYERS: Player[] = ['tim', 'jan', 'ole', 'hannes', 'louisa', 'sonstige'];

export { PLAYERS, PLAYER_DETAILS };

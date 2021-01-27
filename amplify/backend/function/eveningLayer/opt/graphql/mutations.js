'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.deleteEvening = exports.updateEvening = exports.createEvening = void 0;

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const createEvening =
  /* GraphQL */
  `
    mutation CreateEvening($input: CreateEveningInput!) {
      createEvening(input: $input) {
        Datum
        semester
        tim
        jan
        ole
        hannes
        louisa
        sonstige
      }
    }
  `;
exports.createEvening = createEvening;
const updateEvening =
  /* GraphQL */
  `
    mutation UpdateEvening($input: UpdateEveningInput!) {
      updateEvening(input: $input) {
        Datum
        semester
        tim
        jan
        ole
        hannes
        louisa
        sonstige
      }
    }
  `;
exports.updateEvening = updateEvening;
const deleteEvening =
  /* GraphQL */
  `
    mutation DeleteEvening($input: DeleteEveningInput!) {
      deleteEvening(input: $input) {
        Datum
        semester
        tim
        jan
        ole
        hannes
        louisa
        sonstige
      }
    }
  `;
exports.deleteEvening = deleteEvening;

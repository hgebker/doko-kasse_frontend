'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.listEvenings = exports.getEvening = void 0;

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const getEvening =
  /* GraphQL */
  `
    query GetEvening($Datum: String!) {
      getEvening(Datum: $Datum) {
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
exports.getEvening = getEvening;
const listEvenings =
  /* GraphQL */
  `
    query ListEvenings($filter: TableEveningFilterInput, $limit: Int, $nextToken: String) {
      listEvenings(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          Datum
          semester
          tim
          jan
          ole
          hannes
          louisa
          sonstige
        }
        nextToken
      }
    }
  `;
exports.listEvenings = listEvenings;

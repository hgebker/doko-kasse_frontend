'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.onDeleteEvening = exports.onUpdateEvening = exports.onCreateEvening = void 0;

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const onCreateEvening =
  /* GraphQL */
  `
    subscription OnCreateEvening($Datum: String, $semester: String, $tim: Float, $jan: Float, $ole: Float) {
      onCreateEvening(Datum: $Datum, semester: $semester, tim: $tim, jan: $jan, ole: $ole) {
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
exports.onCreateEvening = onCreateEvening;
const onUpdateEvening =
  /* GraphQL */
  `
    subscription OnUpdateEvening($Datum: String, $semester: String, $tim: Float, $jan: Float, $ole: Float) {
      onUpdateEvening(Datum: $Datum, semester: $semester, tim: $tim, jan: $jan, ole: $ole) {
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
exports.onUpdateEvening = onUpdateEvening;
const onDeleteEvening =
  /* GraphQL */
  `
    subscription OnDeleteEvening($Datum: String, $semester: String, $tim: Float, $jan: Float, $ole: Float) {
      onDeleteEvening(Datum: $Datum, semester: $semester, tim: $tim, jan: $jan, ole: $ole) {
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
exports.onDeleteEvening = onDeleteEvening;

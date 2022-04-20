import { Injectable } from '@angular/core';
import {ISegregatedListChartItem} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CardPageActionsService {

  constructor() { }

  public createSegregatedCardInform(): ISegregatedListChartItem {
    // propertyFormControlValue should be same with cardInform properties
    return {
      generalInform: [
        {propertyLabel: 'Имя', propertyFormControlValue: 'firstName'},
        {propertyLabel: 'Фамилиия', propertyFormControlValue: 'lastName'},
        {propertyLabel: 'Отчество', propertyFormControlValue: 'patronymic'}
      ],
      workInform: [
        {propertyLabel: 'Должность', propertyFormControlValue: 'position'},
        {propertyLabel: 'Дирекция', propertyFormControlValue: 'department'},
        {propertyLabel: 'Номер телефона', propertyFormControlValue: 'phoneNumber'}
      ],
      personalInform: [
        {propertyLabel: 'Город', propertyFormControlValue: 'city'},
        {propertyLabel: 'Пол', propertyFormControlValue: 'sex'},
        {propertyLabel: 'Дата рождения', propertyFormControlValue: 'birthDate'},
        {propertyLabel: 'Образование', propertyFormControlValue: 'education'},
        {propertyLabel: 'Паспортные данные', propertyFormControlValue: 'passport'}
      ]
    }
  }
}



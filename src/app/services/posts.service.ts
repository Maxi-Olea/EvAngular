import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  //Arreglo de prueba para poblar la tabla de posteos y sus detalles
  posts:any[] = [
    {id: 1,
    title: 'Titulo del Post - ',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis ligula nec lorem sagittis efficitur. Vestibulum facilisis nibh at leo bibendum, a porta nunc dictum.'},
    {id: 2,
    title: 'Titulo del Post - ',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis ligula nec lorem sagittis efficitur. Vestibulum facilisis nibh at leo bibendum, a porta nunc dictum.'},
    {id: 3,
    title: 'Titulo del Post - ',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis ligula nec lorem sagittis efficitur. Vestibulum facilisis nibh at leo bibendum, a porta nunc dictum.'},
    {id: 4,
    title: 'Titulo del Post - ',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis ligula nec lorem sagittis efficitur. Vestibulum facilisis nibh at leo bibendum, a porta nunc dictum.'},
    {id: 5,
    title: 'Titulo del Post - ',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis ligula nec lorem sagittis efficitur. Vestibulum facilisis nibh at leo bibendum, a porta nunc dictum.'},
    {id: 6,
    title: 'Titulo del Post - ',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis ligula nec lorem sagittis efficitur. Vestibulum facilisis nibh at leo bibendum, a porta nunc dictum.'},
    {id: 7,
    title: 'Titulo del Post - ',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis ligula nec lorem sagittis efficitur. Vestibulum facilisis nibh at leo bibendum, a porta nunc dictum.'},
    {id: 8,
    title: 'Titulo del Post - ',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis ligula nec lorem sagittis efficitur. Vestibulum facilisis nibh at leo bibendum, a porta nunc dictum.'},
    {id: 9,
    title: 'Titulo del Post - ',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis ligula nec lorem sagittis efficitur. Vestibulum facilisis nibh at leo bibendum, a porta nunc dictum.'},
    {id: 10,
    title: 'Titulo del Post - ',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis ligula nec lorem sagittis efficitur. Vestibulum facilisis nibh at leo bibendum, a porta nunc dictum.'},
  ]

  constructor() { }

}


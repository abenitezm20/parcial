import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';

@Component({
  selector: 'app-vehiculo-list',
  templateUrl: './vehiculo-list.component.html',
  styleUrls: ['./vehiculo-list.component.css']
})
export class VehiculoListComponent implements OnInit {

  vehiculos: Array<Vehiculo> = [];
  marcas = [{ itemId: "", contador: 0 }]

  constructor(private vehiculoService: VehiculoService) { }

  getVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe((vehiculos) => {
      this.vehiculos = vehiculos;
      this.getVehiculosByMarca();
    });
  }

  ngOnInit() {
    this.getVehiculos();
  }

  getVehiculosByMarca(): void {
    for(let vehiculo of this.vehiculos){
      if(!this.compareMarca(vehiculo.marca)){
        var newRecordToUpdate = {itemId:vehiculo.marca, contador:1};
        this.marcas.push(newRecordToUpdate);
      }
    }
  }

  compareMarca(itemId: string): boolean{
    var exist: boolean = false;
    this.marcas.forEach(arrayMarca => {
      if(itemId == arrayMarca.itemId){
        exist = true;
        var newRecordToUpdate = {itemId:itemId, contador:arrayMarca.contador+1};
        this.marcas.map((todo, i) => {
          if (todo.itemId == newRecordToUpdate.itemId){
             this.marcas[i] = newRecordToUpdate;
           }
         });
      }
    });
    return exist;
  }
}

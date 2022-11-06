/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { VehiculoListComponent } from './vehiculo-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../vehiculo';

describe('VehiculoListComponent', () => {
  let component: VehiculoListComponent;
  let fixture: ComponentFixture<VehiculoListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ VehiculoListComponent ],
      providers: [VehiculoService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoListComponent);
    component = fixture.componentInstance;
    for(let i = 0; i < 3; i++) {
      const vehiculo = new Vehiculo(
        faker.datatype.number(20),
        faker.name.firstName(),
        faker.name.firstName(),
        faker.name.firstName(),
        faker.datatype.number(20),
        faker.datatype.number(20),
        faker.name.firstName(),
        faker.name.firstName()
      );
      component.vehiculos.push(vehiculo);
    }
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 <css-table-row> elements include header', () => {
    expect(debug.queryAll(By.css('.css-table-row'))).toHaveSize(4)
  });

  it('should have beetween 1 and 3 desc tag for max 3 vehicule type', () => {
    expect(debug.queryAll(By.css('desc'))).toBeLessThanOrEqual(3)
  });

  it('should have 1 <css-table-body> elements in table', () => {
    expect(debug.queryAll(By.css('.css-table-body'))).toHaveSize(1)
  });
});

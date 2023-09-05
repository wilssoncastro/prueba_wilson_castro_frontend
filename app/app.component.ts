import { ServicesService } from './crudServices/services.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pacienteForm: FormGroup;

  pacientes: any[] = [];
  idToEdit: number = 0
  formActived = false;
  isEdit: boolean = false;

  constructor(private fb: FormBuilder, private crudService: ServicesService) {
    this.pacienteForm = this.fb.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Tipo_documento: ['', Validators.required],
      NumeroDocumento: ['', Validators.required],
      Correo: ['', [Validators.required]],
      Telefono: ['', Validators.required],
      FechaNacimiento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.crudService.listPatients().subscribe(resp => {
      this.pacientes = resp.data
    }, err => console.log(err))
  }

  getPatients() {
    this.crudService.listPatients().subscribe(resp => {
      this.pacientes = resp.data
    }, err => console.log(err))
  }

  editar(id: any) {
    this.crudService.listPatientsId(id).subscribe(resp => {

      console.log(resp)
      this.formActived = true;
      this.isEdit = true;
      this.idToEdit = id
      this.pacienteForm.get('Nombres')?.setValue(resp.reponse.nombres)
      this.pacienteForm.get('Apellidos')?.setValue(resp.reponse.apellidos)
      this.pacienteForm.get('Tipo_documento')?.setValue(resp.reponse.tipo_documento)
      this.pacienteForm.get('NumeroDocumento')?.setValue(resp.reponse.numeroDocumento)
      this.pacienteForm.get('Correo')?.setValue(resp.reponse.correo)
      this.pacienteForm.get('Telefono')?.setValue(resp.reponse.telefono)
      const fechaISO = new Date(resp.reponse.fechaNacimiento);
      const fechaFormateada = new Date(fechaISO).toISOString().split('T')[0];
      this.pacienteForm.get('FechaNacimiento')?.setValue(fechaFormateada);
    })
  }

  eliminar(id: any) {
    this.crudService.DeletePatient(id).subscribe(resp => {
      this.getPatients()
      this.cancelar()
      Swal.fire('OK', 'Se ha eliminado correctamente el paciente', 'success');


    })
  }


  crear() {
    this.formActived = true;
    this.isEdit = false;
  }

  cancelar() {
    this.formActived = false;
    this.isEdit = false;
    this.pacienteForm.reset()
    this.idToEdit = 0
  }
  save() {
    if (this.pacienteForm.valid) {

      if (!this.isEdit) {
        let data = this.pacienteForm.value
        data.id = 0
        this.crudService.savePatient(data).subscribe(resp => {
          this.getPatients()
          this.cancelar()
          Swal.fire('OK', 'Los datos se han guardado correctamente', 'success');

        })
      } else {
        let data = this.pacienteForm.value
        data.id = this.idToEdit
        this.crudService.putPatient(data).subscribe(resp => {
          this.getPatients()
          this.cancelar()
          Swal.fire('OK', 'Los datos se han editado correctamente', 'success');

        })
      }


    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes llenar todos los datos',

      })
    }
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormulaService } from '../../services/formula.service';
import { Formula } from '../../../../core/models/formula.model';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.html',
  styleUrls: ['./formulas.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule]
})
export class FormulasComponent implements OnInit {
  formulas: Formula[] = [];
  selectedFormula: Formula | null = null;
  showForm: boolean = true;
  form!: FormGroup;
  isEditing = false;
  isLoading = false;
  error: string = '';

  constructor(private formulaService: FormulaService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    // Se incorporan los controles en camelCase con sus respectivas validaciones
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      standard_batch: ['', [Validators.required, Validators.min(0.1)]],
      unit: ['', [Validators.required, Validators.maxLength(1)]],
      production_time: ['', [Validators.required, Validators.min(1)]],
      gallon_type: ['', [Validators.required, Validators.maxLength(1)]], // CHAR(1)
      gallon_quantity: ['', [Validators.required, Validators.min(1)]],
      estado: [true]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.error = '';
    this.formulaService.getFormulas().subscribe({
      next: (data) => {
        this.formulas = data.filter(f => f.estado);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = 'Error al cargar fórmulas';
        console.error('Error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  saveFormula(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => control.markAsTouched());
      return;
    }

    const val = this.form.value;
    
    const payload = {
      name: val.name,
      description: val.description,
      standard_batch: Number(val.standard_batch),
      unit: val.unit,
      production_time: Number(val.production_time),
      gallon_type: val.gallon_type,
      gallon_quantity: Number(val.gallon_quantity),
      estado: Boolean(val.estado)
    };

    console.log('Fórmula a guardar:', payload);

    if (this.isEditing && this.selectedFormula) {
      this.formulaService.updateFormula(this.selectedFormula.formula_id, payload).subscribe({
        next: () => {
          this.cancelForm();
          this.loadData();
        },
        error: (err: any) => {
          this.error = 'Error al actualizar fórmula';
          console.error('Error:', err);
        }
      });
    } else {
      this.formulaService.createFormula(payload).subscribe({
        next: () => {
          this.cancelForm();
          this.loadData();
        },
        error: (err: any) => {
          this.error = 'Error al crear fórmula';
          console.error('Error:', err);
        }
      });
    }
  }

  editFormula(f: Formula): void {
    this.selectedFormula = f;
    this.isEditing = true;
    this.showForm = true;
    
    // Seteo de valores al formulario incluyendo los campos con snake_case
    this.form.patchValue({
      name: f.name,
      description: f.description,
      standard_batch: f.standard_batch,
      unit: f.unit,
      production_time: f.production_time,
      gallon_type: f.gallon_type,
      gallon_quantity: f.gallon_quantity,
      estado: f.estado
    });
    this.cdr.detectChanges();
  }

  // AJUSTE DE ELIMINACIÓN LÓGICA
  deleteFormula(id: number): void {
    if (confirm('¿Eliminar fórmula?')) {
      this.formulaService.deleteFormula(id).subscribe({
        next: () => this.loadData(),
        error: (err: any) => {
          this.error = 'Error al eliminar fórmula';
          console.error('Error:', err);
        }
      });
    }
  }

  cancelForm(): void {
    this.form.reset({ estado: true });
    this.isEditing = false;
    this.selectedFormula = null;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.cancelForm();
    }
  }
}
package vallegrande.edu.pe.AgroTecno.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "formula", schema = "dbo") // Asegúrate de poner el schema correcto
public class Formula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "formula_id")
    private Integer formulaId;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "VARCHAR(MAX)")
    private String description;

    @Column(name = "standard_batch", precision = 12, scale = 2)
    private BigDecimal standardBatch;

    @Column(name = "unit", length = 1, columnDefinition = "CHAR(1)")
    private String unit;

    @Column(name = "production_time")
    private Integer productionTime;

    @Column(name = "gallon_type", length = 1, columnDefinition = "CHAR(1)")
    private String gallonType;

    @Column(name="gallon_quantity", columnDefinition = "INT")
    private Integer gallonQuantity;

    @Column(name = "estado", nullable = false)
    private Boolean estado;

    // Auditoría
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "restored_at")
    private LocalDateTime restoredAt;

    

    /* Getters y Setters
    public Integer getFormulaId() {
        return formulaId;
    }

    public void setFormulaId(Integer formulaId) {
        this.formulaId = formulaId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getStandardBatch() {
        return standardBatch;
    }

    public void setStandardBatch(BigDecimal standardBatch) {
        this.standardBatch = standardBatch;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Integer getProductionTime() {
        return productionTime;
    }

    public void setProductionTime(Integer productionTime) {
        this.productionTime = productionTime;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public LocalDateTime getRestoredAt() {
        return restoredAt;
    }

    public void setRestoredAt(LocalDateTime restoredAt) {
        this.restoredAt = restoredAt;
    }
     */
}
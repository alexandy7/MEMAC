import { z } from "zod";

export const productFormSchema = z.object({
  category: z.string().min(1, "Selecione uma categoria"),
  model: z.string().min(1, "Informe o modelo do produto"),
  description: z.string().min(10, "A descrição deve ter no mínimo 10 caracteres"),
  shelfNumber: z.string().min(1, "Informe o número da prateleira"),
  unit: z.string().min(1, "Selecione uma unidade de medida"),
  quantity: z.number().min(0, "A quantidade não pode ser negativa"),
  netWeight: z.number().min(0, "O peso não pode ser negativo"),
  observation: z.string().optional(),
  supplierName: z.string().min(1, "Informe o nome do fornecedor"),
  grossCost: z.number().min(0, "O custo bruto deve ser maior que zero"),
  profitMargin: z.number().min(0, "A margem de lucro não pode ser negativa"),
  additionalCosts: z.number().min(0, "Os custos adicionais não podem ser negativos"),
  orderNumber: z.string().optional(),
  supplierCompany: z.string().optional(),
  invoiceNumber: z.string().optional(),
  project: z.object({
    value: z.number().min(0),
    iss: z.number().min(0).max(100),
  }),
  commercial: z.object({
    value: z.number().min(0),
    ipi: z.number().min(0).max(100),
    icms: z.number().min(0).max(100),
  }),
  machining: z.object({
    value: z.number().min(0),
    iss: z.number().min(0).max(100),
  }),
  coating: z.object({
    value: z.number().min(0),
    ipi: z.number().min(0).max(100),
    icms: z.number().min(0).max(100),
  }),
  transport: z.object({
    value: z.number().min(0),
    iss: z.number().min(0).max(100),
    icms: z.number().min(0).max(100),
  }),
  toto: z.object({
    value: z.number().min(0),
    iss: z.number().min(0).max(100),
  }),
  rawMaterial: z.object({
    value: z.number().min(0),
    ipi: z.number().min(0).max(100),
    icms: z.number().min(0).max(100),
  }),
  boilermaking: z.object({
    value: z.number().min(0),
    iss: z.number().min(0).max(100),
  }),
  milling: z.object({
    value: z.number().min(0),
    iss: z.number().min(0).max(100),
  }),
  painting: z.object({
    value: z.number().min(0),
    iss: z.number().min(0).max(100),
  }),
  finishing: z.object({
    value: z.number().min(0),
    iss: z.number().min(0).max(100),
    icms: z.number().min(0).max(100),
  }),
  travelExpenses: z.object({
    value: z.number().min(0),
    iss: z.number().min(0).max(100),
  }),
  packaging: z.number().min(0),
  others: z.number().min(0),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
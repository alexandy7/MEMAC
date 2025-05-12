
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Representative } from "../../../../types/Representative";
import { toast } from "sonner";
import { set } from "date-fns";

interface CreateRepresentativeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (representative: Omit<Representative, 'id'>) => void;
  initialData?: Representative;
}

const RepresentativeForm = ({ open, onClose, onSave, initialData }: CreateRepresentativeModalProps) => {
  const isEditing = !!initialData;

  
  const [formData, setFormData] = useState<Omit<Representative, 'id'>>({
    fullName: "",
    shortName: "",
    phone: "",
    city: "",
    state: "",
    document: "",
    contact: "",
    address: "",
    neighborhood: "",
    zipCode: "",
    email: "",
    commission: "",
    notes: "",
  });

  useEffect(()=>{

    if (initialData) setFormData({
      fullName: initialData?.fullName,
      shortName: initialData?.shortName,
      phone: initialData?.phone,
      city: initialData?.city,
      state: initialData?.state,
      document: initialData?.document,
      contact: initialData?.contact,
      address: initialData?.address,
      neighborhood: initialData?.neighborhood,
      zipCode: initialData?.zipCode,
      email: initialData?.email,
      commission: initialData?.commission,
      notes: initialData?.notes,
    })
  }, [initialData])
  
  console.log(formData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.fullName || !formData.shortName || !formData.phone) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Representante" : "Novo Representante"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo/Razão Social *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shortName">Nome Reduzido *</Label>
              <Input
                id="shortName"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Município *</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">UF *</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                maxLength={2}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="document">CNPJ/CPF *</Label>
              <Input
                id="document"
                name="document"
                value={formData.document}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact">Contato *</Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="commission">% Comissão</Label>
              <Input
                id="commission"
                name="commission"
                value={formData.commission}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-navy hover:bg-navy/90 text-white transition-all duration-300">
              {isEditing ? "Atualizar" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RepresentativeForm;

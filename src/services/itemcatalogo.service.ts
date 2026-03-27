import { supabase } from '@/lib/supabase';
import type { ItemCatalogo } from '@/types/db';

export async function getItemCatalogosByCatalogoCodigo(codigoCatalogo: string): Promise<ItemCatalogo[]> {
  // 1. Buscar el catálogo padre
  const { data: catalogo, error: catalogoError } = await supabase
    .from('Catalogo')
    .select('Id, Codigo')
    .eq('Codigo', codigoCatalogo)
    .single();

  if (catalogoError || !catalogo) {
    console.error('Error fetching Catalogo', catalogoError);
    return [];
  }

  // 2. Traer solo los items de ese catálogo
  const { data, error } = await supabase
    .from('ItemCatalogo')
    .select('Id, Nombre, Codigo, IdCatalogo')
    .eq('IdCatalogo', catalogo.Id)
    .order('Id', { ascending: true });

  if (error) {
    console.error('Error fetching ItemCatalogo by Catalogo', error);
    return [];
  }

  return (data as ItemCatalogo[]) ?? [];
}

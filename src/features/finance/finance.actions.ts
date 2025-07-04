"use server";

import { revalidatePath } from "next/cache";
import financeApi from "@/features/finance/finance.api";
import { FinanceFormValues } from "@/features/finance/schemas";

export async function createFinanceRecordAction(values: FinanceFormValues) {
  try {
    await financeApi.create(values);
    revalidatePath("/home/transactions");
    return { success: true };
  } catch (error) {
    console.error("Error creating finance record:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Error desconocido"
    };
  }
}

export async function updateFinanceRecordAction(id: number, values: FinanceFormValues) {
  try {
    await financeApi.update(id, values);
    revalidatePath("/home/transactions");
    return { success: true };
  } catch (error) {
    console.error("Error updating finance record:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Error desconocido"
    };
  }
}

export async function deleteFinanceRecordAction(id: number) {
  try {
    await financeApi.delete(id);
    revalidatePath("/home/transactions");
    return { success: true };
  } catch (error) {
    console.error("Error deleting finance record:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Error desconocido"
    };
  }
}
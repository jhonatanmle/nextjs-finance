"use client";

import { Option } from "@/features/core/types/option.type";
import { useFinanceStore } from "@/features/finance/finance.store";
import { FilterForm } from "@/features/finance/schemas";
import MonthPicker from "@/shared/components/month-picker";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { PAYMENT_TYPE_FILTER_OPTIONS } from "@/shared/constants/payment-type-options";
import { startOfDay } from "date-fns";
import { PropsWithChildren, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = Partial<
  PropsWithChildren<{
    categories: Option[];
    onSearch: (filterValue: FilterForm) => void;
  }>
>;

const FinanceFilterListForm = ({ children, categories, onSearch }: Props) => {
  const { setShowFinanceForm, showFinanceForm } = useFinanceStore();

  const form = useForm<FilterForm>({
    defaultValues: {
      date: new Date(),
    },
  });

  const onFinish = useCallback(
    (formValues: FilterForm) => {
      onSearch!({
        ...formValues,
        date: startOfDay(formValues.date),
      });
    },
    [onSearch]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!showFinanceForm && e.key === "n") {
        e.preventDefault();
        setShowFinanceForm(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [showFinanceForm, setShowFinanceForm]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFinish)}
        className="grid grid-cols-1 gap-4 md:flex md:flex-wrap"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <MonthPicker
                defaultValue={field.value}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentType"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full md:w-[250px]">
                    <SelectValue placeholder="Medio de pago" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PAYMENT_TYPE_FILTER_OPTIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full md:w-[250px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary">
          Buscar
        </Button>
        <div className="flex gap-4">{children}</div>
      </form>
    </Form>
  );
};

export default FinanceFilterListForm;

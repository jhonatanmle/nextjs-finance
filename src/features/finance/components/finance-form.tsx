import { CurrencyType } from "@/features/core/types/currency.type";
import { Option } from "@/features/core/types/option.type";
import { RecordType } from "@/features/core/types/record-type";
import {
  FinanceFormValues,
  financeFormSchema,
  FinanceRecord,
} from "@/features/finance/schemas";
import Datepicker from "@/shared/components/datepicker";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { CURRENCY_OPTIONS } from "@/shared/constants/currency-options";
import { PAYMENT_TYPE_OPTIONS } from "@/shared/constants/payment-type-options";
import { RECORD_TYPE_OPTIONS } from "@/shared/constants/record-type-options";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { Subcategory } from "@/features/category/category.schema";
import { financeRecordForm } from "@/features/finance/mapper/finance-record-form.mapper";
import { ALL_OPTION_VALUE } from "@/shared/constants/option";

type Props = React.ComponentProps<"div"> & {
  initialValue?: FinanceRecord;
  isPending?: boolean;
  categories: Option[];
  subcategories: Subcategory[];
  goals: Option[];
  onFinish: (formValues: FinanceFormValues) => void;
};

const FinanceForm = ({
  initialValue,
  isPending,
  className,
  categories,
  subcategories,
  goals,
  onFinish,
}: Props) => {
  const form = useForm<FinanceFormValues>({
    resolver: zodResolver(financeFormSchema),
    defaultValues: initialValue
      ? financeRecordForm.mapFrom(initialValue)
      : {
          currencyType: CurrencyType.PEN,
          recordType: RecordType.expense,
          date: new Date(),
        },
  });

  const categoryIdValue = form.watch("categoryId");
  const goalIdValue = form.watch("goalId");

  const subcategoryOptions = useMemo(() => {
    if (!categoryIdValue) return [];
    return subcategories.filter(
      (subcategory) => Number(categoryIdValue) === subcategory.categoryId
    );
  }, [categoryIdValue, subcategories]);

  const goalOptions = goals;

  const onChangeCategory = () => {
    form.resetField("subcategoryId");
  };

  return (
    <div className={cn(className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="grid gap-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="date"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormItem className="grid items-center">
                  <FormLabel>Fecha de registro</FormLabel>
                  <Datepicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Seleccione fecha"
                    className="w-full"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recordType"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormItem className="grid items-center">
                  <FormLabel>Tipo de registro</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="m-0 w-full">
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {RECORD_TYPE_OPTIONS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormItem className="grid items-center">
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    onValueChange={(event) => {
                      onChangeCategory();

                      return field.onChange(event);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="m-0 w-full">
                        <SelectValue placeholder="Seleccione categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subcategoryId"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormItem className="grid items-center">
                  <FormLabel>Subcategoría</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="m-0 w-full">
                        <SelectValue placeholder="Seleccione categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subcategoryOptions?.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="currencyType"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem className="grid items-center">
                    <FormLabel>Moneda</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="m-0 md:w-[100px]">
                          <SelectValue placeholder="Moneda" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CURRENCY_OPTIONS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem className="grid items-center">
                    <FormLabel>Monto</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        type="number"
                        // startAdornment={
                        //   <>{`${
                        //     currencyValue === CurrencyType.PEN ? 'S/' : '$'
                        //   }`}</>
                        // }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="paymentType"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormItem className="grid items-center">
                  <FormLabel>Método de pago</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="m-0 w-full">
                        <SelectValue placeholder="Seleccione categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAYMENT_TYPE_OPTIONS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="goalId"
              render={({ field }) => (
                <FormItem key={field.value} className="grid items-center">
                  <FormLabel>Objetivo (opcional)</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger
                        className="m-0 w-full"
                        disabled={!goalOptions?.length}
                      >
                        <SelectValue placeholder="Seleccione objetivo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {goalOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {goalIdValue && goalIdValue !== ALL_OPTION_VALUE ? (
              <FormField
                control={form.control}
                name="goalNetAmount"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem className="grid items-center">
                    <FormLabel>Monto neto del objetivo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : null}
          </div>

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentario</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ingrese comentario"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            onClick={form.handleSubmit(onFinish)}
            disabled={!form.formState.isValid || !form.formState.isDirty}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {initialValue ? "Actualizar" : "Registrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FinanceForm;

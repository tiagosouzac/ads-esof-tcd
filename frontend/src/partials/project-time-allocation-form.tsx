import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const projectTimeAllocationFormValidationSchema = z.object({
  employee: z.string({
    required_error: "Informe o nome do colaborador.",
    invalid_type_error: "Informe o nome do colaborador.",
  }),
  hours: z.string({
    required_error: "Informe a quantidade de horas.",
    invalid_type_error: "Informe a quantidade de horas.",
  }),
  month: z.string({
    required_error: "Informe o mês.",
    invalid_type_error: "Informe o mês.",
  }),
  year: z.string({
    required_error: "Informe o ano.",
    invalid_type_error: "Informe o ano.",
  }),
});

type ProjectTimeAllocationFormData = z.infer<
  typeof projectTimeAllocationFormValidationSchema
>;

export function ProjectTimeAllocationForm(props: React.ComponentProps<"form">) {
  const form = useForm({
    resolver: zodResolver(projectTimeAllocationFormValidationSchema),
  });

  function onSubmit(data: ProjectTimeAllocationFormData) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="month"
            render={({ field, fieldState }) => (
              <FormItem className="w-1/2">
                <FormLabel htmlFor="month">Mês</FormLabel>

                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(new Date().getMonth() + 1)}
                  >
                    <FormControl>
                      <SelectTrigger id="month" className="w-full">
                        <SelectValue placeholder="Selecione o mês" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="1">Janeiro</SelectItem>
                      <SelectItem value="2">Fevereiro</SelectItem>
                      <SelectItem value="3">Março</SelectItem>
                      <SelectItem value="4">Abril</SelectItem>
                      <SelectItem value="5">Maio</SelectItem>
                      <SelectItem value="6">Junho</SelectItem>
                      <SelectItem value="7">Julho</SelectItem>
                      <SelectItem value="8">Agosto</SelectItem>
                      <SelectItem value="9">Setembro</SelectItem>
                      <SelectItem value="10">Outubro</SelectItem>
                      <SelectItem value="11">Novembro</SelectItem>
                      <SelectItem value="12">Dezembro</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage>{fieldState?.error?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field, fieldState }) => (
              <FormItem className="w-1/2">
                <FormLabel htmlFor="year">Ano</FormLabel>

                <FormControl>
                  <Input
                    id="year"
                    placeholder="Ex.: 2023"
                    type="number"
                    min={new Date().getFullYear()}
                    defaultValue={new Date().getFullYear()}
                    {...field}
                  />
                </FormControl>

                <FormMessage>{fieldState?.error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="employee"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="employee">Funcionário</FormLabel>

              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger id="manager" className="w-full">
                      <SelectValue placeholder="Selecione o funcionário" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="1">João</SelectItem>
                    <SelectItem value="2">Maria</SelectItem>
                    <SelectItem value="3">José</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage>{fieldState?.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hours"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="hours">Horas</FormLabel>

              <FormControl>
                <Input
                  id="hours"
                  placeholder="Ex.: 40"
                  type="number"
                  {...field}
                />
              </FormControl>

              <FormMessage>{fieldState?.error?.message}</FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

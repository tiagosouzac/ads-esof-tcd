import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const employeeFormValidationSchema = z.object({
  name: z.string({ required_error: "Informe o nome completo do funcionário." }),
  email: z
    .string({ required_error: "Informe o endereço de e-mail do funcionário." })
    .email(
      "O endereço de e-mail informado não é válido. Verifique e tente novamente."
    ),
  manager: z.string({
    required_error: "Selecione o gerente responsável pelo funcionário.",
  }),
});

type EmployeeFormData = z.infer<typeof employeeFormValidationSchema>;

export function EmployeeForm(props: React.ComponentProps<"form">) {
  const form = useForm({
    resolver: zodResolver(employeeFormValidationSchema),
  });

  function onSubmit(data: EmployeeFormData) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="name">Nome Completo</FormLabel>

              <FormControl>
                <Input id="name" placeholder="Ex.: João da Silva" {...field} />
              </FormControl>

              {fieldState.error ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Informe o nome completo do funcionário.
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="email">Endereço de E-mail</FormLabel>

              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ex.: joao.silva@email.com"
                  {...field}
                />
              </FormControl>

              {fieldState.error ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Informe o endereço de e-mail corporativo do funcionário. Este
                  e-mail será utilizado por ele para acessar o sistema.
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="manager"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="manager">Gerente Responsável</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger id="manager">
                    <SelectValue placeholder="Selecione o gerente responsável" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="1">João</SelectItem>
                  <SelectItem value="2">Maria</SelectItem>
                  <SelectItem value="3">José</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.error ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Escolha o gerente responsável por supervisionar o funcionário.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

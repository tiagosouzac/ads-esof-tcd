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
import { Textarea } from "@/components/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/select";

const projetctFormValidationSchema = z.object({
  name: z.string({ required_error: "Informe o nome do projeto." }),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "finished"], {
    message: "Selecione o status do projeto.",
  }),
});

type ProjectFormData = z.infer<typeof projetctFormValidationSchema>;

export function ProjectForm(props: React.ComponentProps<"form">) {
  const form = useForm({
    resolver: zodResolver(projetctFormValidationSchema),
  });

  function onSubmit(data: ProjectFormData) {
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
              <FormLabel htmlFor="name">Nome</FormLabel>

              <FormControl>
                <Input
                  id="name"
                  placeholder="Ex.: Aplicativo com IA para gestão de projetos"
                  {...field}
                />
              </FormControl>

              {fieldState.error ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Informe o nome do projeto. Este nome será utilizado para
                  identificar o projeto no sistema e deve ser único.
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="description">Descrição</FormLabel>

              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Ex.: Este projeto é um aplicativo com IA para gestão de projetos, que visa facilitar a organização e o acompanhamento de tarefas."
                  {...field}
                />
              </FormControl>

              {fieldState.error ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Descreva o projeto brevemente. Este campo é opcional, mas pode
                  ser útil para fornecer mais informações sobre o projeto.
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="status">Status do projeto</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o status do projeto" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="finished">Concluído</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.error ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  Selecione o status do projeto. O status ativo indica que o
                  projeto está em andamento, o status inativo indica que o
                  projeto está pausado e o status concluído indica que o projeto
                  foi finalizado.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

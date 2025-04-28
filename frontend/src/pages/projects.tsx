import { AlarmClockPlus, Clock, FolderPlus, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet";
import { useNavigation } from "@/hooks/use-navigation";
import { useEffect } from "react";
import { Badge } from "@/components/badge";
import { ProjectForm } from "@/partials/project-form";
import { ProjectTimeAllocationForm } from "@/partials/project-time-allocation-form";

function Projects() {
  const { setBreadcrumb } = useNavigation();

  useEffect(() => {
    setBreadcrumb([{ label: "Projetos" }]);
  }, []);

  const projects = [
    {
      id: 1,
      name: "Microsoft",
      allocatedHours: 100,
      spentHours: 50,
      monthlySpentHours: 20,
      status: "active",
    },
    {
      id: 2,
      name: "Apple",
      allocatedHours: 200,
      spentHours: 150,
      monthlySpentHours: 30,
      status: "inactive",
    },
    {
      id: 3,
      name: "Google",
      allocatedHours: 300,
      spentHours: 200,
      monthlySpentHours: 40,
      status: "active",
    },
    {
      id: 4,
      name: "Meta",
      allocatedHours: 400,
      spentHours: 300,
      monthlySpentHours: 50,
      status: "active",
    },
  ];

  const allocations = {
    "Outubro de 2023": [
      { id: 1, employee: "José", hours: 20 },
      { id: 2, employee: "Maria", hours: 30 },
    ],
    "Novembro de 2023": [
      { id: 1, employee: "José", hours: 20 },
      { id: 2, employee: "Maria", hours: 30 },
    ],
    "Dezembro de 2023": [
      { id: 3, employee: "João", hours: 40 },
      { id: 4, employee: "Ana", hours: 50 },
    ],
    "Janeiro de 2024": [
      { id: 5, employee: "Carlos", hours: 60 },
      { id: 6, employee: "Fernanda", hours: 70 },
    ],
  };

  return (
    <>
      <div className="flex justify-between items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Projetos</h1>

          <p className="text-muted-foreground">
            Aqui você pode visualizar, criar, editar e excluir projetos, além de
            gerenciar os funcionários alocados a cada um deles.
          </p>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <FolderPlus />
              Criar novo projeto
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Criar novo projeto</SheetTitle>
              <SheetDescription>
                Preencha os campos abaixo para cadastrar um novo projeto.
              </SheetDescription>
            </SheetHeader>

            <div className="px-4">
              <ProjectForm id="create-project" />
            </div>

            <SheetFooter>
              <Button form="create-project" type="submit">
                Criar projeto
              </Button>

              <SheetClose asChild>
                <Button variant="outline">Cancelar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Nome</TableHead>
            <TableHead className="w-1/6">Total de horas alocadas</TableHead>
            <TableHead className="w-1/6">Total de horas dedicadas</TableHead>
            <TableHead className="w-1/6">Horas dedicadas neste mês</TableHead>
            <TableHead className="w-1/6">Situação</TableHead>
            <TableHead className="w-1/6">
              <span className="sr-only">Ações</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.allocatedHours}</TableCell>
              <TableCell>{project.spentHours}</TableCell>
              <TableCell>{project.monthlySpentHours}</TableCell>
              <TableCell>
                {project.status === "active" ? (
                  <Badge>Ativo</Badge>
                ) : (
                  <Badge variant="outline">Inativo</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Clock />
                      <span className="sr-only">
                        Gerenciar horas do projeto
                      </span>
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Gerenciar horas do projeto</SheetTitle>
                      <SheetDescription>
                        Gerencie as horas alocadas a este projeto.
                      </SheetDescription>
                    </SheetHeader>

                    <div className="px-4 space-y-6">
                      <Sheet modal={false}>
                        <SheetTrigger asChild>
                          <Button
                            className="w-full"
                            variant="outline"
                            size="sm"
                          >
                            <AlarmClockPlus />
                            Alocar horas ao projeto
                          </Button>
                        </SheetTrigger>

                        <SheetContent side="right">
                          <SheetHeader>
                            <SheetTitle>Alocar horas ao projeto</SheetTitle>
                            <SheetDescription>
                              Preencha os campos abaixo para alocar horas ao
                              projeto.
                            </SheetDescription>
                          </SheetHeader>

                          <div className="px-4 space-y-6">
                            <ProjectTimeAllocationForm id="create-project-time-allocation" />
                          </div>

                          <SheetFooter>
                            <Button>Alocar horas</Button>

                            <SheetClose asChild>
                              <Button variant="outline">Cancelar</Button>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>

                      <div className="space-y-3">
                        {Object.entries(allocations).map(
                          ([month, allocations]) => (
                            <div key={month} className="border rounded-md">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead colSpan={3}>{month}</TableHead>
                                  </TableRow>
                                </TableHeader>

                                <TableBody>
                                  {allocations.map((allocation) => (
                                    <TableRow key={allocation.id}>
                                      <TableCell className="w-1/3">
                                        {allocation.employee}
                                      </TableCell>
                                      <TableCell className="w-1/3">
                                        {allocation.hours} horas
                                      </TableCell>
                                      <TableCell className="w-1/3 text-right">
                                        <Sheet modal={false}>
                                          <SheetTrigger asChild>
                                            <Button
                                              className="-my-1"
                                              variant="ghost"
                                              size="icon"
                                            >
                                              <Pencil />
                                              <span className="sr-only">
                                                Editar alocação de horas
                                              </span>
                                            </Button>
                                          </SheetTrigger>

                                          <SheetContent side="right">
                                            <SheetHeader>
                                              <SheetTitle>
                                                Editar alocação de horas
                                              </SheetTitle>
                                              <SheetDescription>
                                                Atualize os dados da alocação de
                                                horas nos campos abaixo.
                                              </SheetDescription>
                                            </SheetHeader>

                                            <div className="px-4">
                                              <ProjectTimeAllocationForm id="update-project-time-allocation" />
                                            </div>

                                            <SheetFooter>
                                              <Button>Salvar alterações</Button>

                                              <SheetClose asChild>
                                                <Button variant="outline">
                                                  Cancelar
                                                </Button>
                                              </SheetClose>
                                            </SheetFooter>
                                          </SheetContent>
                                        </Sheet>

                                        <Sheet modal={false}>
                                          <SheetTrigger asChild>
                                            <Button
                                              className="-my-1"
                                              variant="ghost"
                                              size="icon"
                                            >
                                              <Trash />
                                              <span className="sr-only">
                                                Excluir alocação de horas
                                              </span>
                                            </Button>
                                          </SheetTrigger>

                                          <SheetContent side="right">
                                            <SheetHeader>
                                              <SheetTitle>
                                                Excluir alocação de horas
                                              </SheetTitle>
                                              <SheetDescription>
                                                Tem certeza de que deseja
                                                excluir esta alocação de horas?
                                                Essa ação é irreversível e
                                                removerá permanentemente os
                                                dados da alocação.
                                              </SheetDescription>
                                            </SheetHeader>

                                            <SheetFooter>
                                              <Button variant="destructive">
                                                Confirmar exclusão
                                              </Button>

                                              <SheetClose asChild>
                                                <Button variant="outline">
                                                  Cancelar
                                                </Button>
                                              </SheetClose>
                                            </SheetFooter>
                                          </SheetContent>
                                        </Sheet>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Pencil />
                      <span className="sr-only">Editar projeto</span>
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Editar informações do projeto</SheetTitle>
                      <SheetDescription>
                        Atualize os dados do projeto nos campos abaixo.
                      </SheetDescription>
                    </SheetHeader>

                    <div className="px-4">
                      <ProjectForm id="update-project" />
                    </div>

                    <SheetFooter>
                      <Button form="update-employee" type="submit">
                        Salvar alterações
                      </Button>

                      <SheetClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash />
                      <span className="sr-only">Excluir projeto</span>
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Excluir projeto</SheetTitle>
                      <SheetDescription>
                        Tem certeza de que deseja excluir este projeto? Essa
                        ação é irreversível e removerá permanentemente os dados
                        do projeto.
                      </SheetDescription>
                    </SheetHeader>

                    <SheetFooter>
                      <Button variant="destructive">Confirmar exclusão</Button>

                      <SheetClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export { Projects };

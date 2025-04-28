import { Pencil, Trash, UserPlus } from "lucide-react";
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
import { EmployeeForm } from "@/partials/employee-form";

function Employees() {
  const { setBreadcrumb } = useNavigation();

  useEffect(() => {
    setBreadcrumb([{ label: "Funcionários" }]);
  }, []);

  const employees = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@mail.com",
      manager: "Jane Smith",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@mail.com",
      manager: "John Doe",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@mail.com",
      manager: "John Doe",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@mail.com",
      manager: "Jane Smith",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Funcionários
          </h1>

          <p className="text-muted-foreground">
            Aqui você pode visualizar, adicionar, editar e excluir informações
            de funcionários.
          </p>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <UserPlus />
              Cadastrar funcionário
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Cadastrar novo funcionário</SheetTitle>
              <SheetDescription>
                Preencha os campos abaixo para cadastrar um novo funcionário na
                empresa.
              </SheetDescription>
            </SheetHeader>

            <div className="px-4">
              <EmployeeForm id="create-employee" />
            </div>

            <SheetFooter>
              <Button form="create-employee" type="submit">
                Cadastrar
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
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Gestor</TableHead>
            <TableHead>
              <span className="sr-only">Ações</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.manager}</TableCell>
              <TableCell className="text-right">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Pencil />
                      <span className="sr-only">Editar funcionário</span>
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Editar informações do funcionário</SheetTitle>
                      <SheetDescription>
                        Atualize os dados do funcionário nos campos abaixo.
                      </SheetDescription>
                    </SheetHeader>

                    <div className="px-4">
                      <EmployeeForm id="update-employee" />
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
                      <span className="sr-only">Excluir funcionário</span>
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Excluir funcionário</SheetTitle>
                      <SheetDescription>
                        Tem certeza de que deseja excluir este funcionário? Essa
                        ação é irreversível e removerá permanentemente os dados
                        do funcionário.
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

export { Employees };

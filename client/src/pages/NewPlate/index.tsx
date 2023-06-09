import { Container } from "./style";
import { useSystem } from "../../hooks/useSystem";
import { usePlateCreate } from "../../hooks/usePlateCreate";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { InputFile } from "../../components/InputFile";
import { Input } from "../../components/Input";
import { ButtonSave } from "../../components/ButtonSave";
import { Select } from "../../components/Select";
import { Textarea } from "../../components/Textarea";
import { InputList } from "../../components/InputList";
import { UploadIcon } from "../../assets/UploadIcon";

type PlateDataTypes = {
  name: string;
  category: string;
  ingredients: string[];
  price: string;
  description: string;
  image: file;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  event: React.ChangeEvent<HTMLInputElement>;
}

export function NewPlate() {
  const [inputFileName, setInputFileName] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [price, setPrice] = useState("");
  const { mutate, isSuccess } = usePlateCreate();

  const { menuActive } = useSystem();
  const navigate = useNavigate();

  const { control, register, handleSubmit, formState: { errors }, watch, setError, reset } = useForm<PlateDataTypes>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
    rules: {
      required: "Campo obrigatório",
      maxLength: { value: 9, message: "Número máximo de ingredientes é 9" },
    }
  });

  function handleAddIngredient() {
    if (newIngredient.length == 0) {
      return setError('ingredients', { message: 'Adicionar nome do ingrediente' });
    };

    if (newIngredient.length > 255) {
      return setError('ingredients', { message: 'Ingrediente excediu número de 255 caracteres' });
    };

    if (newIngredient.length > 0 && newIngredient.length <= 255) {
      append({ name: newIngredient });
      setNewIngredient("");
    };
  };

  function handleFormatPrice(value: string) {
    if (value != "R$ 0,0") {
      const currency = parseFloat(value.replace(/\D/g, "")) / 100;
      const formatted = currency.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      return setPrice(formatted);
    } else {
      return setPrice("");
    };
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setInputFileName("");
      reset({ ingredients: [] });
      setPrice("");
    };
  }, [isSuccess]);

  const onSubmitCreatePlate = (data: PlateDataTypes) => mutate(data);

  return (
    <Container>
      {!menuActive &&
        <>
          <button className="backPageButton" onClick={() => navigate(-1)}>&lt; Voltar</button>

          <h2 className="pageTitle">Novo prato</h2>

          <form onSubmit={handleSubmit(onSubmitCreatePlate)} id="formCreatePlate">
            <div className="formPart1">
              <section>
                <InputFile
                  id="uploadImagePlate"
                  label="Imagem do prato"
                  placeholder={inputFileName ? inputFileName : "Selecione imagem"}
                  icon={UploadIcon}
                  onChange={(event) => setInputFileName(event.target.files[0].name)}
                  error={errors.image?.message}
                  register={register("image", {
                    required: "Campo obrigatório",
                    maxLength: { value: 255, message: "Número máximo de caracteres é 255" },
                    validate: {
                      fileFormat: (file) => /\.(jpg|jpeg|png|gif)$/i.test(file[0].name) || "Permitido somente tipo imagem",
                      fileCount: (file) => file.length === 1 || "Por favor adicionar apenas uma imagem",
                      fileSize: (file) => file[0].size <= 2 * 2 ** 20 || "O tamanho máximo permitido é de 2MB",
                    }
                  })}
                />
              </section>

              <section>
                <Input
                  id="name"
                  label="Nome"
                  type="text"
                  placeholder="Ex.: Salada Ceasar"
                  error={errors.name?.message}
                  register={register("name", {
                    required: "Campo obrigatório",
                    pattern: { value: /^[^0-9]+$/, message: "Somente texto é permitido" },
                    maxLength: { value: 255, message: "Número máximo de caracteres é 255" }
                  })}
                />
              </section>

              <section>
                <Select
                  id="category"
                  label="Categoria"
                  options={["Refeições", "Sobremesas", "Bebidas"]}
                  error={errors.category?.message}
                  register={register("category", {
                    required: "Campo obrigatório",
                    pattern: { value: /^(Refeições|Sobremesas|Bebidas)$/, message: "Somente uma das opções é permitido" },
                    maxLength: { value: 255, message: "Número máximo de caracteres é 255" }
                  })}
                />
              </section>
            </div>

            <div className="formPart2">
              <section className="containerIngredients">
                <label htmlFor="boxIngredients">Ingredientes</label>
                <div id="boxIngredients">
                  {fields?.map((ingredient, index) => (
                    <InputList
                      key={ingredient.id}
                      value={ingredient.name}
                      onClick={() => remove(index)}
                    />
                  ))}

                  <InputList
                    isNew
                    placeholder="Adicionar"
                    value={newIngredient}
                    onChange={(event) => setNewIngredient(event.target.value)}
                    onClick={handleAddIngredient}
                  />
                </div>
                {errors.ingredients &&
                  (errors.ingredients.root ?
                    <span className='inputError'>{errors.ingredients.root.message}</span> :
                    <span className='inputError'>{errors.ingredients.message}</span>
                  )
                }
              </section>

              <section>
                <Input
                  id="price"
                  label="Preço"
                  type="text"
                  placeholder="R$ 0,00"
                  value={price}
                  onChange={(event) => handleFormatPrice(event.target.value)}
                  error={errors.price?.message}
                  register={register("price", {
                    required: "Campo obrigatório",
                    pattern: { value: /^R\$\s[0-9]+([.][0-9]+)?([,][0-9]+)?$/, message: "Insira um valor válido. Ex: R$ 10,25" },
                    maxLength: { value: 255, message: "Número máximo de caracteres é 255" }
                  })}
                />
              </section>
            </div>

            <section>
              <Textarea
                id="description"
                label="Descrição"
                placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                error={errors.description?.message}
                register={register("description", {
                  required: "Campo obrigatório",
                  maxLength: { value: 255, message: "Número máximo de caracteres é 255" }
                })}
              />
            </section>
          </form>

          <div className="formButtons">
            <ButtonSave name="Salvar alterações" form="formCreatePlate" />
          </div>
        </>
      }
    </Container>
  )
}

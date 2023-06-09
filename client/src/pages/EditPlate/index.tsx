import { Container } from "./style"
import { useSystem } from "../../hooks/useSystem"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { usePlateUpdate } from "../../hooks/usePlateUpdate";
import { InputFile } from "../../components/InputFile";
import { Input } from "../../components/Input";
import { ButtonSave } from "../../components/ButtonSave";
import { ButtonDelete } from "../../components/ButtonDelete";
import { Select } from "../../components/Select";
import { Textarea } from "../../components/Textarea";
import { InputList } from "../../components/InputList";
import { UploadIcon } from "../../assets/UploadIcon";
import { ImSpinner2 } from "react-icons/im";
import { useParams } from "react-router-dom";
import { usePlateQuery } from "../../hooks/usePlateQuery";
import { API } from "../../services/api";
import { toast } from 'react-toastify';

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

export function EditPlate() {
  const [inputFileName, setInputFileName] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [plateID, setPlateID] = useState("");
  const [price, setPrice] = useState("");
  const [plateDataForm, setPlateDataForm] = useState({
    name: "",
    category: "",
    ingredients: [],
    price: "",
    description: "",
    image: null,
  });

  const { mutate, isSuccess } = usePlateUpdate();
  const { menuActive, setInputSearchPlatesValue } = useSystem();
  const navigate = useNavigate();
  const params = useParams();

  const { data, isLoading, error } = usePlateQuery();
  const plateData = data?.find(plate => plate.id == params.id);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (plateData) {
      setPlateDataForm({
        name: plateData.name,
        category: plateData.category,
        ingredients: plateData.ingredients,
        price: Number(plateData.price).toLocaleString('pt-br', { style: 'currency', currency: 'brl' }),
        description: plateData.description,
        image: plateData.image,
      });
    }
  }, [plateData])

  const { control, register, handleSubmit, formState: { errors }, watch, setError } = useForm<PlateDataTypes>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
    rules: {
      required: plateDataForm.ingredients.length === 0 ? false : "Campo obrigatório",
      maxLength: { value: 9, message: "Número máximo de ingredientes é 9" },
    },
  });

  useEffect(() => {
    append(plateDataForm?.ingredients);
  }, [plateDataForm.ingredients]);

  function handleInputChange(event: React.ChangeEventHandler<HTMLInputElement>) {
    const { name, value } = event.target;
    setPlateDataForm({
      ...plateDataForm,
      [name]: value
    });
  };

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
      return setPlateDataForm({
        ...plateDataForm,
        price: formatted,
      });
    } else {
      return setPlateDataForm({
        ...plateDataForm,
        price: "",
      });
    };
  };

  const onDeletePlate = async () => {
    const confirmDelete = confirm("Deseja excluir prato?")
    if (confirmDelete) {
      await API.delete(`/plates/${plateData.id}`)
        .then((response) => {
          toast.success(response.data || "Prato excluído com sucesso");
          navigate("/");
          setInputSearchPlatesValue("");
        })
        .catch((error) => toast.error(error.response.data.error || "Erro ao excluir prato"));
    };
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      setInputSearchPlatesValue("");
    };
  }, [isSuccess]);

  const onSubmitUpdatePlate = (data: PlateDataTypes) => mutate({
    ...data,
    id: plateData.id,
    category: plateDataForm.category
  });

  return (
    <Container>
      {!menuActive &&
        <>
          <button className="backPageButton" onClick={() => navigate(-1)}>&lt; Voltar</button>

          <h2 className="pageTitle">Editar prato</h2>

          {isLoading && <p><ImSpinner2 className="spinner" /></p>}
          {error && <p className="queryError">Algo deu errado!</p>}

          <form onSubmit={handleSubmit(onSubmitUpdatePlate)} id="formEditPlate">
            <div className="formPart1">
              <section>
                <InputFile
                  id="uploadImagePlate"
                  label="Imagem do prato"
                  placeholder={inputFileName ? inputFileName : "Selecione imagem para alterá-la"}
                  icon={UploadIcon}
                  onChange={(event) => setInputFileName(event.target.files[0].name)}
                  error={errors.image?.message}
                  register={register("image", {
                    maxLength: { value: 255, message: "Número máximo de caracteres é 255" },
                    validate: {
                      fileFormat: (file) => {
                        if (!file || file.lenght === 0) return;
                        /\.(jpg|jpeg|png|gif)$/i.test(file[0]?.name) || "Permitido somente tipo imagem"
                      },
                      fileCount: (file) => {
                        if (!file || file.lenght === 0) return;
                        file.length === 1 || "Por favor adicionar apenas uma imagem"
                      },
                      fileSize: (file) => {
                        if (!file || file.lenght === 0) return;
                        file[0]?.size <= 2 * 2 ** 20 || "O tamanho máximo permitido é de 2MB"
                      },
                    }
                  })}
                />
              </section>

              <section>
                <Input
                  id="name"
                  label="Nome"
                  type="text"
                  value={plateDataForm.name}
                  placeholder="Ex.: Salada Ceasar"
                  onChange={handleInputChange}
                  error={errors.name?.message}
                  register={register("name", {
                    shouldUnregister: true,
                    required: plateDataForm.name ? false : "Campo obrigatório",
                    pattern: { value: /^[^0-9]+$/, message: "Somente texto é permitido" },
                    maxLength: { value: 255, message: "Número máximo de caracteres é 255" }
                  })}
                />
              </section>

              <section>
                <Select
                  id="category"
                  label="Categoria"
                  value={plateDataForm.category}
                  options={["Refeições", "Sobremesas", "Bebidas"]}
                  onChange={handleInputChange}
                  error={errors.category?.message}
                  register={register("category", {
                    required: plateDataForm.category ? false : "Campo obrigatório",
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
                  value={plateDataForm.price}
                  onChange={(event) => handleFormatPrice(event.target.value)}
                  error={errors.price?.message}
                  register={register("price", {
                    required: plateDataForm.price ? false : "Campo obrigatório",
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
                value={plateDataForm.description}
                onChange={handleInputChange}
                placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                error={errors.description?.message}
                register={register("description", {
                  required: plateDataForm.description ? false : "Campo obrigatório",
                  maxLength: { value: 255, message: "Número máximo de caracteres é 255" }
                })}
              />
            </section>
          </form>

          <div className="formButtons">
            <ButtonDelete name="Excluir prato" onClick={onDeletePlate} />
            <ButtonSave name="Salvar alterações" form="formEditPlate" />
          </div>
        </>
      }
    </Container>
  )
}

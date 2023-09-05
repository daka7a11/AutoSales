import { useEffect, useState } from "react";
import styles from "../UI/Form.module.css";
import createStyles from "./CreatePost.module.css";
import ImagePreview from "./ImagePreview";
import { vehicleTypes, fuel, gearbox } from "../../util.js";
import useInput from "../../hooks/useInput";
import useData from "../../hooks/useData";
import { useNavigate } from "react-router-dom";

const requiredMsg = <p className={styles["invalid-message"]}>Required!</p>;

const CreatePost = () => {
  const [images, setImages] = useState([]);
  const [makesModels, setMakesModels] = useState([]);
  const [regions, setRegions] = useState([]);
  const [models, setModels] = useState([]);

  const navigate = useNavigate();
  const { getMakesModels, getRegions, createAdvertisement } = useData();

  const {
    value: enteredTitle,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput((x) => x.trim() !== "");

  const {
    value: selectedType,
    isValid: typeIsValid,
    hasError: typesHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resetType,
  } = useInput((x) => x.trim() !== "");

  const {
    value: selectedMake,
    isValid: makeIsValid,
    hasError: makeHasError,
    valueChangeHandler: makeChangeHandler,
    inputBlurHandler: makeBlurHandler,
    reset: resetMake,
  } = useInput((x) => x.trim() !== "");

  const {
    value: selectedModel,
    isValid: modelIsValid,
    hasError: modelHasError,
    valueChangeHandler: modelChangeHandler,
    inputBlurHandler: modelBlurHandler,
    reset: resetModel,
  } = useInput((x) => x.trim() !== "");

  const {
    value: selectedFuel,
    isValid: fuelIsValid,
    hasError: fuelHasError,
    valueChangeHandler: fuelChangeHandler,
    inputBlurHandler: fuelBlurHandler,
    reset: resetFuel,
  } = useInput((x) => x.trim() !== "");

  const {
    value: selectedGearbox,
    isValid: gearboxIsValid,
    hasError: gearboxHasError,
    valueChangeHandler: gearboxChangeHandler,
    inputBlurHandler: gearboxBlurHandler,
    reset: resetGearbox,
  } = useInput((x) => x.trim() !== "");

  const {
    value: enteredPrice,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput((x) => x.trim() !== "" && Number(x) > 0);

  const {
    value: selectedManufacturingDate,
    isValid: manufacturingDateIsValid,
    hasError: manufacturingDateHasError,
    valueChangeHandler: manufacturingDateChangeHandler,
    inputBlurHandler: manufacturingDateBlurHandler,
    reset: resetManufacturingDate,
  } = useInput((x) => x.trim() !== "");

  const {
    value: selectedRegion,
    isValid: regionIsValid,
    hasError: regionHasError,
    valueChangeHandler: regionChangeHandler,
    inputBlurHandler: regionBlurHandler,
    reset: resetRegion,
  } = useInput((x) => x.trim() !== "");

  const {
    value: enteredHorsePower,
    isValid: horsePowerIsValid,
    hasError: horsePowerHasError,
    valueChangeHandler: horsePowerChangeHandler,
    inputBlurHandler: horsePowerBlurHandler,
    reset: resetHorsePower,
  } = useInput((x) => x.trim() !== "" && Number(x) > 0);

  const {
    value: enteredMileage,
    isValid: mileageIsValid,
    hasError: mileageHasError,
    valueChangeHandler: mileageChangeHandler,
    inputBlurHandler: mileageBlurHandler,
    reset: resetMileage,
  } = useInput((x) => x.trim() !== "" && Number(x) > 0);

  const {
    value: enteredDescription,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput((x) => x.trim() !== "");

  useEffect(() => {
    async function fetchData() {
      const makesModels = await getMakesModels();

      setMakesModels(makesModels);

      const regions = (await getRegions()).map((r) => r.name);
      setRegions(regions);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const selectedMakeModels = makesModels.find(
      (mm) => mm.brand === selectedMake
    );

    if (!selectedMakeModels) {
      setModels([]);
      resetModel();
      return;
    }
    setModels(selectedMakeModels.models);
  }, [selectedMake]);

  const imagesChangeHandler = (e) => {
    const files = Object.values(e.target.files);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        setImages((state) => [...state, reader.result]);
      };

      reader.readAsDataURL(file);
    }
  };

  const isFormValid =
    titleIsValid &&
    typeIsValid &&
    makeIsValid &&
    modelIsValid &&
    fuelIsValid &&
    gearboxIsValid &&
    priceIsValid &&
    manufacturingDateIsValid &&
    regionIsValid &&
    horsePowerIsValid &&
    mileageIsValid &&
    descriptionIsValid;

  const invalidFormClass = !isFormValid && styles["invalid-form"];

  const createSubmitHandler = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }
    const data = {
      title: enteredTitle,
      type: selectedType,
      make: selectedMake,
      model: selectedModel,
      fuel: selectedFuel,
      gearbox: selectedGearbox,
      price: enteredPrice,
      manufacturing_date: selectedManufacturingDate,
      region: selectedRegion,
      hp: enteredHorsePower,
      mileage: enteredMileage,
      images: images,
      description: enteredDescription,
    };

    await createAdvertisement(data);

    navigate("/");
  };

  const imagePreviewClickHandler = (url) => {
    setImages(images.filter((x) => x !== url));
  };

  return (
    <div className={`page-container`}>
      <div className={`page-title`}>
        <h2>Create post</h2>
      </div>
      <form onSubmit={createSubmitHandler} className={styles["form"]}>
        <div className={createStyles["form-container"]}>
          <div className={createStyles["form-col"]}>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="title">Title</label>
              <input
                className={titleHasError ? styles["invalid-input"] : ""}
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
                id="title"
                name="title"
                type="text"
                value={enteredTitle}
              />
              {titleHasError && requiredMsg}
            </div>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="type">Type</label>
              <select
                className={typesHasError ? styles["invalid-input"] : ""}
                id="type"
                name="type"
                onChange={typeChangeHandler}
                onBlur={typeBlurHandler}
                value={selectedType}
              >
                <option value="">Choose vehicle type</option>
                {vehicleTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {typesHasError && requiredMsg}
            </div>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="make">Make</label>
              <select
                className={makeHasError ? styles["invalid-input"] : ""}
                onChange={makeChangeHandler}
                onBlur={makeBlurHandler}
                id="make"
                name="make"
                value={selectedMake}
              >
                <option value="">Choose vehicle make</option>
                {makesModels.map((m) => (
                  <option key={m.brand} value={m.brand}>
                    {m.brand}
                  </option>
                ))}
              </select>
              {makeHasError && requiredMsg}
            </div>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="model">Model</label>
              <select
                className={modelHasError ? styles["invalid-input"] : ""}
                onChange={modelChangeHandler}
                onBlur={modelBlurHandler}
                value={selectedModel}
                id="model"
                name="model"
                disabled={models.length == 0}
              >
                <option value="">Choose vehicle model</option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {modelHasError && requiredMsg}
            </div>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="fuel">Fuel</label>
              <select
                className={fuelHasError ? styles["invalid-input"] : ""}
                onChange={fuelChangeHandler}
                onBlur={fuelBlurHandler}
                value={selectedFuel}
                id="fuel"
                name="fuel"
              >
                <option value="">Choose fuel</option>
                {fuel.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              {fuelHasError && requiredMsg}
            </div>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="gearbox">Gearbox</label>
              <select
                className={gearboxHasError ? styles["invalid-input"] : ""}
                onChange={gearboxChangeHandler}
                onBlur={gearboxBlurHandler}
                value={selectedGearbox}
                id="gearbox"
                name="gearbox"
              >
                <option value="">Choose gearbox</option>
                {gearbox.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {gearboxHasError && requiredMsg}
            </div>
          </div>

          <div className={createStyles["form-col"]}>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="price">Price</label>
              <input
                className={priceHasError ? styles["invalid-input"] : ""}
                onChange={priceChangeHandler}
                onBlur={priceBlurHandler}
                value={enteredPrice}
                id="price"
                name="price"
                type="number"
                min={0}
              />
              {priceHasError && requiredMsg}
            </div>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="manufacturing-date">Manufacturing date</label>
              <input
                className={
                  manufacturingDateHasError ? styles["invalid-input"] : ""
                }
                onChange={manufacturingDateChangeHandler}
                onBlur={manufacturingDateBlurHandler}
                value={selectedManufacturingDate}
                id="manufacturing-date"
                name="manufacturingDate"
                type="month"
              />
              {manufacturingDateHasError && requiredMsg}
            </div>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="region">Region</label>
              <select
                className={regionHasError ? styles["invalid-input"] : ""}
                onChange={regionChangeHandler}
                onBlur={regionBlurHandler}
                value={selectedRegion}
                id="region"
                name="region"
              >
                <option value="">Choose region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {regionHasError && requiredMsg}
            </div>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="hp">Horse power</label>
              <input
                className={horsePowerHasError ? styles["invalid-input"] : ""}
                onChange={horsePowerChangeHandler}
                onBlur={horsePowerBlurHandler}
                value={enteredHorsePower}
                id="hp"
                name="horsePower"
                type="number"
                min={0}
              />
              {horsePowerHasError && requiredMsg}
            </div>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="mileage">Mileage</label>
              <input
                className={mileageHasError ? styles["invalid-input"] : ""}
                onChange={mileageChangeHandler}
                onBlur={mileageBlurHandler}
                value={enteredMileage}
                id="mileage"
                name="mileage"
                type="number"
                min={0}
              />
              {mileageHasError && requiredMsg}
            </div>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="images">Images</label>
              <input
                onChange={imagesChangeHandler}
                id="images"
                name="images"
                type="file"
                title=" "
                multiple
              />
            </div>
          </div>

          <div className={`${createStyles["form-description"]} `}>
            <div className={styles["form-wrapper"]}>
              <label htmlFor="description">Description</label>
              <textarea
                className={`${createStyles["description-textarea"]} ${
                  descriptionHasError ? styles["invalid-input"] : ""
                }`}
                onChange={descriptionChangeHandler}
                onBlur={descriptionBlurHandler}
                value={enteredDescription}
                id="description"
                name="description"
                rows="6"
              />
              {priceHasError && requiredMsg}
            </div>
          </div>
        </div>
        {images.length > 0 && (
          <div className={createStyles["img-preview-container"]}>
            {images.map((i) => (
              <ImagePreview
                key={i}
                url={i}
                imagePreviewClickHandler={imagePreviewClickHandler}
              />
            ))}
          </div>
        )}

        <div className={styles["form-wrapper"]}>
          <button
            className={`btn ${styles["submit-btn"]} ${invalidFormClass}`}
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

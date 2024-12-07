'use client';
import React, {useState, useEffect} from "react";
import InputField from "@/components/InputField/InputField";
import CustomButton from "@/components/Button/CustomButton";
import TextEditor from "@/components/TextEditor/TextEditor";
import Dropdown from "@/components/Dropdown/Dropdown";
import ProductImgUploader, {UploadedImage} from "@/components/Image/ProductImgUploader";
import {
    addProduct,
    getCategories,
    addCategory,
    getProductItemDetails,
    updateProduct
} from "@/apis/productApi/productApi";
import PopupContainer from "@/components/Popup/PopupContainer";
import {productSchema} from "@/schema/productSchema/productSchema";
import {showToast} from '@/components/Messages/showMessage';
import {useRouter, useSearchParams} from "next/navigation";


const AddProductForm = () => {
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [editorContent, setEditorContent] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [stock, setStock] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [category, setCategory] = useState<number>(0);
    const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [newCategory, setNewCategory] = useState<string>("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [resetImages, setResetImages] = useState(false);
    const [resetEditor, setRestEditor] = useState(false);
    const searchParams = useSearchParams();
    let [id, setId] = useState(0);

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

    useEffect(() => {
        id = parseInt(searchParams.get("productId") as string);
        const getProductList = async () => {
            if (id) {
                const product = await getProductItemDetails(id, 1);
                setId(product.productId)
                setName(product.name);
                setStock(product.stock)
                setPrice(product.price)
                setDiscount(product.discount)
                setCategory(product.category)
                const uploadedImages = product.imageUrls.map((url: string) => ({url}));
                setImages(uploadedImages);
                setEditorContent(product.description)

            }
        }
        getProductList()


    }, [searchParams]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getCategories();
                const categoryOptions = categories.map((cat: { categoryId: number; categoryName: string }) => ({
                    label: cat.categoryName,
                    value: cat.categoryId,
                }));
                setOptions(categoryOptions);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        if (!newCategory.trim()) {
            alert("Category name cannot be empty.");
            return;
        }
        try {
            const addedCategory = await addCategory({categoryName: newCategory});
            setOptions((prev) => [
                ...prev,
                {label: addedCategory.categoryName, value: addedCategory.categoryId},
            ]);
            setShowPopup(false);
            setNewCategory("");
            console.log("Category added successfully!");
        } catch (error) {
            console.error("Failed to add category:", error);
        }
    };

    const clearAll = () => {
        setName('');
        setEditorContent('');
        setStock(0);
        setPrice(0);
        setDiscount(0);
        setCategory(0);
        setImages([]);
        setErrors({});
        handleEditorChange("")
        setResetImages(true)
        setRestEditor(true)
    }


    const handleSubmit = async () => {
        const payload = {
            productId: id,
            name,
            description: editorContent,
            stock,
            price,
            discount,
            rating: 0,
            ratingCount: 0,
            category,
            imageUrls: images.map((image) => image.url),
        };

        const validation = productSchema.safeParse(payload);

        console.log(validation)
        console.log(payload.imageUrls)
        console.log(payload)

        if (!validation.success) {
            console.log(validation.success)
            const fieldErrors: Record<string, string> = {};
            validation.error.errors.forEach((err: { path: (string | number)[]; message: string; }) => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        try {
            if (id) {
                await updateProduct(payload);
            } else {
                await addProduct(payload);
            }
            console.log("Product added successfully!");
            showToast({
                type: 'success',
                message: 'Product added successfully!',
                description: 'Your product has been added to the database.',
            })
            clearAll()

        } catch (error) {
            console.error("Failed to add product:", error);
            showToast({
                type: 'error',
                message: 'Product adding unsuccessful!',
                description: 'Please Try again.',
            })
        }
    };

    return (
        <div>
            <div className="rounded-lg shadow-lg p-4 grid grid-cols-1 w-full md:grid-cols-10 gap-7">
                <div className="md:col-span-6 pl-2">
                    <h2 className="text-2xl mb-4">General Information</h2>
                    <InputField
                        id="name"
                        type="text"
                        placeholder="Name"
                        label={true}
                        labelName="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}


                    <h2 className="text-2xl mt-2">Description</h2>
                    <TextEditor
                        className="your-class"
                        initialContent={editorContent}
                        onChange={handleEditorChange}
                        resetEditor={false}
                        setRestEditor={setRestEditor}
                    />

                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                    <h2 className="text-2xl mt-5">Pricing and Stock</h2>
                    <div className="grid grid-cols-1 w-full md:grid-cols-10 gap-7 mt-3">
                        <div className="md:col-span-5">
                            <InputField
                                id="price"
                                type="number"
                                placeholder="Base Pricing"
                                label={true}
                                labelName="Base Pricing"
                                className="mb-5"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

                            <InputField
                                id="discount"
                                type="number"
                                placeholder="Discount"
                                label={true}
                                labelName="Discount"
                                value={discount}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                            />
                            {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}

                        </div>
                        <div className="md:col-span-5">
                            <InputField
                                id="stock"
                                type="number"
                                placeholder="Stock"
                                label={true}
                                labelName="Stock"
                                className="mb-5"
                                value={stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                            />
                            {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
                        </div>
                    </div>
                    <h2 className="text-2xl mt-5">Category</h2>
                    <div className="flex items-center gap-2">
                        <Dropdown
                            options={options}
                            placeholder="Select Category"
                            onChange={(value) => setCategory(Number(value))}
                            value={category}
                        />
                        <CustomButton buttonLabel="+" onClick={() => setShowPopup(true)} variant={"primary"}/>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                    </div>
                </div>

                <div className="md:col-span-4">
                    <ProductImgUploader images={images} setImages={setImages} resetImages={resetImages}
                                        setResetImages={setResetImages}/>
                    {errors.imageUrls && <p className="text-red-500 text-sm">{errors.imageUrls}</p>}
                </div>
                <div className="flex justify-between items-center pl-2">
                    <CustomButton buttonLabel="Add Product" onClick={handleSubmit}/>
                </div>
            </div>

            <PopupContainer isOpen={showPopup} onClose={() => {
                setShowPopup(false)
            }}>
                <div className="bg-white rounded-lg p-6 w-96 ">
                    <h2 className="text-2xl mb-4">Add New Category</h2>
                    <InputField
                        id="newCategory"
                        type="text"
                        placeholder="Enter category name"
                        label={true}
                        labelName="Category Name"
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <CustomButton buttonLabel="Cancel" onClick={() => setShowPopup(false)} variant={"outline"}/>
                        <CustomButton buttonLabel="Add" onClick={handleAddCategory} variant={"primary"}/>
                    </div>
                </div>
            </PopupContainer>

        </div>
    );
};

export default AddProductForm;

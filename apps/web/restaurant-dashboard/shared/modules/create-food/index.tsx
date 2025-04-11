"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Group, Paper, Stack, TextInput, Textarea, Text, SimpleGrid, Image } from "@mantine/core";
import { useState, useRef } from "react";
import { Icons } from "@/utils/icon";
import { CREATE_FOOD } from "@/graphql/actions/create.food";
import { useMutation } from "@apollo/client";

const formSchema = z.object({
  name: z.string().min(2, "نام غذا باید حداقل 2 کاراکتر باشد"),
  price: z.string().min(1, "قیمت را وارد کنید"),
  description: z.string().min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
  category: z.string().min(2, "دسته‌بندی را وارد کنید"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateFoodForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreview, setFilePreview] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createFoodMutation] = useMutation(CREATE_FOOD);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleFiles = (newFiles: File[]) => {
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    
    // Add new files to existing ones instead of replacing
    setFiles(prev => [...prev, ...imageFiles]);
    
    // Generate previews for new files
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
      
      // Reset input value to allow selecting the same file again
      e.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setFilePreview(filePreview.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormValues) => {
    if (filePreview.length === 0) {
      alert("لطفا حداقل یک تصویر انتخاب کنید");
      return;
    }

    await createFoodMutation({
      variables: {
        createFoodDto: {
          name: data.name,
          description: data.description,
          category: data.category,
          price: parseFloat(data.price),
          images: filePreview,
        },
      },
    }).then((res) => {
      // toast.success("Food uploaded successfully!");
      // reset();
      // redirect("/foods");
    });
  };

  return (
    <Paper p="xl" radius="md" bg="#111C42">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label="نام غذا"
            placeholder="مثال: همبرگر"
            {...register("name")}
            error={errors.name?.message}
          />

          <TextInput
            label="قیمت"
            placeholder="مثال: 120000"
            type="number"
            {...register("price")}
            error={errors.price?.message}
          />

          <TextInput
            label="دسته‌بندی"
            placeholder="مثال: فست فود"
            {...register("category")}
            error={errors.category?.message}
          />

          <Textarea
            label="توضیحات"
            placeholder="توضیحات غذا را وارد کنید..."
            minRows={3}
            {...register("description")}
            error={errors.description?.message}
          />

          <Box>
            <Text size="sm" mb="xs">تصاویر غذا</Text>
            <Box
              className={`
                border-2 border-dashed rounded-md p-6 cursor-pointer
                transition-colors duration-200
                ${isDragging ? 'border-teal-500 bg-teal-500/10' : 'border-gray-600'}
              `}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                multiple
                hidden
              />
              
              {files.length === 0 ? (
                <Stack align="center" gap="xs">
                  {Icons.upload}
                  <Text size="sm">تصاویر را اینجا رها کنید یا کلیک کنید</Text>
                  <Text size="xs" c="dimmed">فرمت‌های مجاز: JPG, PNG, WebP</Text>
                </Stack>
              ) : (
                <Stack gap="lg">
                  <Text size="sm">تعداد فایل‌های انتخاب شده: {files.length}</Text>
                  <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }}>
                    {filePreview.map((preview, index) => (
                      <Box key={index} pos="relative">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          radius="md"
                          h={120}
                          w="auto"
                          fit="cover"
                        />
                        <Button
                          pos="absolute"
                          top={5}
                          right={5}
                          size="compact-xs"
                          color="red"
                          variant="filled"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                        >
                          {Icons.delete}
                        </Button>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Stack>
              )}
            </Box>
          </Box>

          <Button type="submit" color="teal" fullWidth>
            ثبت غذا
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

"use client"

import { extensions } from "@/constants/extensions";
import { CalendarIcon, EmailIcon, FileIcon, HideIcon, ImageIcon, PasswordIcon, ScollIcon, StepRefusedIcon, UploadIcon, UserIcon, ViewFileIcon } from "@/constants/Icons";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Input, Textarea } from "@nextui-org/input";
import { RiMailOpenLine, RiEyeLine, RiEyeCloseLine, RiLockLine, RiImageCircleLine, RiUserLine, RiSearch2Line, RiUploadCloudLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import { Button, DateInput, Tooltip } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";
import { CalendarDate, parseDate } from "@internationalized/date";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatNumber, getLanguageDetails } from "@/constants/functions";
import { useLocale, useTranslations } from "next-intl";



export default function HtmlInput({ type = "text", placeholder, inputValue, onChange, onClick, className = '', supported_format = '', isDisabled = false, errorText = "", reference }) {
  const [isVisible, setIsVisible] = useState(false);
  const [ispasswordHideIconVisible, setIspasswordHideIconVisible] = useState(false)

  // const t = useTranslations()
  // const currentLanguage = getLanguageDetails(useLocale())
  // const active_language = currentLanguage.key
  // const active_dir = currentLanguage.direction



  const [passwordInputValue, setPasswordInputValue] = useState('');

  // Customized file input 
  const [dataUrl, setDataUrl] = useState(inputValue ?? null)
  // const fileInput = useRef(null)


  // selector_text_with input
  const [selectorInput, setSelectorInput] = useState()
  const [textInput, setTextInput] = useState(inputValue)
  const [selectroValue, setselectroValue] = useState(placeholder.inputValue)


  const toggleVisibility = () => setIsVisible(!isVisible);


  function acceptOnlyNumbers(evt) {
    if (isNaN(evt.key) && evt.key !== 'Backspace') {
      evt.preventDefault();
    }
  }


  switch (type) {

    // Normal text input 
    case 'text':
      return (
        <div className="flex flex-col gap-1">

          <Input
            className={cn(className)}
            type="text"
            label={placeholder.text}
            placeholder={placeholder.placeholder}
            labelPlacement="outside"
            startContent={
              placeholder.icon
            }
            isDisabled={isDisabled}
            onChange={onChange}
            value={inputValue}
          />

          <p className="text-sm text-red-500">{errorText}</p>

        </div>


      )

    // Number input 
    case 'number':
      return (
        <div className="flex flex-col gap-1">

          <Input className={className}
            type="text"
            label={placeholder.text}
            placeholder={placeholder.placeholder}
            maxLength={placeholder.maxLength}
            labelPlacement="outside"
            startContent={
              placeholder.icon
            }
            onKeyDown={(e) => acceptOnlyNumbers(e)}
            onChange={onChange}
            value={inputValue}
            isDisabled={isDisabled}

          />
          <p className="text-sm text-red-500">{errorText}</p>

        </div>

      )



    // Returns email input 
    case 'email':
      return (
        <div className="flex flex-col gap-1">

          <Input className={className}
            type="email"
            label={placeholder}
            placeholder="you@example.com"
            labelPlacement="outside"
            startContent={
              < EmailIcon />
            }
            onChange={onChange}
            value={inputValue}
            isDisabled={isDisabled}

          />

          <p className="text-sm text-red-500">{errorText}</p>

        </div>

      )

    // Returns password input 
    case 'password':
      return (
        <div className="flex flex-col gap-1">

          <Input className={className}
            type={isVisible ? "text" : "password"}
            label={placeholder}
            placeholder={placeholder}
            labelPlacement="outside"
            startContent={
              < PasswordIcon />
            }
            isDisabled={isDisabled}

            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  < RiEyeLine size={16} />
                ) : (
                  < RiEyeCloseLine size={16} />
                )}
              </button>
            }
            onChange={onChange}
            value={inputValue}
          />

          <p className="text-sm text-red-500">{errorText}</p>

        </div>
      )



    // Returns file input 
    case 'file':
      return (
        <div className="flex flex-col gap-1">

          <Input className={className}
            type="file"
            label={placeholder}
            placeholder={placeholder}
            labelPlacement="outside"
            startContent={
              < ImageIcon />
            }
            onChange={onChange}
          />

          <p className="text-sm text-red-500">{errorText}</p>

        </div>
      )




    // Returns file input 
    case 'customized_file':

      var supported_extensions

      if (supported_format) {
        supported_extensions = extensions[supported_format]
      } else {
        supported_extensions = [...extensions.image, ...extensions.file]
      }


      function ImagePreview({ dataUrl }) {

        // if (extensions.image.includes(fileType)) {
        return (
          <Image
            src={dataUrl}
            alt="preview"
            fill
            className="w-[90%] h-auto rounded-lg object-cover"
          />
        )

        // } else if (extensions.file.includes(fileType)) {
        //   return (
        //     <iframe width="100%" height="100%" frameborder="0" src={dataUrl}></iframe>
        //   )
        // } else if (fileType == 'image') {
        //   return (
        //     <Image
        //       src={dataUrl}
        //       alt="preview"
        //       fill
        //       className="w-[90%] h-auto rounded-lg object-cover"
        //     />
        //   )

        // }
        // console.log(fileType)

      }


      // if (placeholder.isLivePreview) {

      // }
      function generateDataUrl(file, callback) {
        const reader = new FileReader();
        reader.onload = () => callback(reader.result);
        reader.readAsDataURL(file);
      }
      // const [uploadedFiles, setUploadedFiles] = useState()
      // const [fileExtension, setFileExtension] = useState('')


      const handleFileChange = (e) => {

        // const file = e.target.files?.[0]
        const files = e.target.files

        const all_uploaded_files = []



        if (files) {
          // console.log(files)

          Object.values(files).forEach(file => {
            const file_extension = file.type.split('/')[1]?.toUpperCase()

            if (supported_extensions.includes(file_extension)) {

              const data = {
                file,
                fileName: file.name,
                size: file.size,
                extension: file_extension,
              }

              all_uploaded_files.push(data)


              if (placeholder.isLivePreview) {
                const first_file = files[0]
                generateDataUrl(first_file, setDataUrl)

                // console.log(files, first_file)
              }
            }

          })





        } else {
          // setDataUrl('')
        }


        if (onChange) {

          onChange(all_uploaded_files)
          // console.log(uploadedFiles)
        }
      }






      return (
        <div className="flex flex-col gap-2 h-full w-full">

          {
            placeholder.icon && !placeholder.placeholder &&
            <p className="text-sm flex gap-1 items-center">
              {placeholder.icon}
            </p>
          }
          {
            placeholder.placeholder && !placeholder.icon &&
            <p className="text-sm flex gap-1 items-center">
              {placeholder.placeholder}
            </p>
          }
          {
            placeholder.placeholder && placeholder.icon &&
            <p className="text-sm flex gap-1 items-center">
              {placeholder.icon}
              {placeholder.placeholder}
            </p>
          }


          <div className={cn(`w-full h-full relative  p-5 rounded-xl border-dashed border-own_primary-1 bg-light-2 dark:bg-dark-2 border-2 border-opacity-50`, className)}>


            {
              placeholder?.isLivePreview && dataUrl &&
              <ImagePreview dataUrl={dataUrl} />
            }

            <div className="flex flex-col justify-center items-center h-full w-full">
              {
                !dataUrl && placeholder.onlyIcon && <UploadIcon special_size={60} />
              }

              {
                !placeholder.onlyIcon && !dataUrl && <div className="flex h-full w-full flex-col gap-2 items-center justify-center">
                  <span className="text-text_color-1 dark:text-light-1">
                    <UploadIcon
                      special_size={60}
                    />
                  </span>

                  <p className="text-base font-semibold text-center text-dark-1 dark:text-light-1">
                    {/* <span className="text-own_primary-1">choose file </span> to upload */}
                    Choose file to upload
                  </p>
                  {/* <p className="text-base font-semibold text-center"><span className="text-own_primary-2">{t('global.inputs.choose_file')} </span> {t('global.inputs.to_upload')}</p> */}
                  {/* <p className="text-sm text-gray-1 text-center">{t('global.inputs.supported_formats')}: {supported_extensions.join(', ')}</p> */}
                  <p className="text-xs opacity-85 text-dark-1 dark:text-light-1 text-center">Supported formats: {supported_extensions.join(', ')}</p>
                </div>
              }

            </div>


            <input
              type="file"
              className="opacity-0 z-20 w-full h-full absolute top-0 left-0"
              onChange={handleFileChange}
              onClick={onClick}
              // ref={fileInput}
              ref={reference}
              // {placeholder.isMultiple && multiple}
              multiple={!placeholder?.isMultiple ? false : true}
            />


            <p className="text-sm text-red-500">{errorText}</p>


          </div>
        </div>

      )



    // Returns name input 
    case 'name':
      return (
        <div className="flex flex-col gap-2">

          <Input
            className={cn('', className)}
            // classNames={{
            //   inputWrapper: ["focus:ring-yellow-500"]
            // }}
            css={{
              '&:focus-within': {
                outline: '2px solid #0070f3', // Customize outline color and width
                outlineOffset: '2px',         // Add an offset if needed
              },
            }}
            type="text"
            label={placeholder.label || 'Name here'}
            placeholder={placeholder.placeholder || 'Ayoub Farahi'}
            labelPlacement="outside"
            startContent={
              < UserIcon size={16} />
            }
            onChange={onChange}
            value={inputValue}
            isDisabled={isDisabled}

          />

          <p className="text-sm text-red-500">{errorText}</p>

        </div>
      )


    // Returns username input 

    case 'username':
      return (
        <div className="flex flex-col gap-2">

          <Input className={className}
            type="text"
            label={placeholder}
            placeholder="Username"
            labelPlacement="outside"
            startContent={
              < UserIcon size={16} />
            }
            onChange={onChange}
            value={inputValue}
            isDisabled={isDisabled}
          />
          <p className="text-sm text-red-500">{errorText}</p>

        </div>
      )



    // Returns search input 
    case 'search':
      return (
        <div className="flex flex-col gap-2">

          <Input className={className}
            type="text"
            label={placeholder.label}
            placeholder={placeholder.placeholder}
            labelPlacement="outside"
            startContent={
              < RiSearch2Line size={16} />
            }
            value={inputValue}
            // onChange={onChange()}
            onValueChange={onChange}
            isDisabled={isDisabled}

          />

          <p className="text-sm text-red-500">{errorText}</p>

        </div>
      )


    // Returns customized input 
    case 'customized':
      return (
        <div className="flex flex-col gap-2">

          <Input className={className}
            type="customized"
            label={placeholder.text}
            placeholder={placeholder.text}
            labelPlacement="outside"
            startContent={
              placeholder.icon
            }
            onChange={onChange}
            value={inputValue}

          />

          <p className="text-sm text-red-500">{errorText}</p>

        </div>
      )




    // Returns email input 
    case 'without_top_placeholder':
      return (
        <Input className={className}
          type="text"
          label={''}
          placeholder={placeholder.text}
          labelPlacement="outside"
          startContent={
            placeholder.icon
          }
          onChange={onChange}
          value={inputValue}
          isDisabled={isDisabled}

        />

      )




    // #######   For date picker 
    // Read only 
    case 'date_picker_read_only':
      return (
        <div className="flex flex-col gap-2">

          <DateInput
            label={placeholder.text}
            defaultValue={parseDate(placeholder.defaultValue)}
            isReadOnly

            placeholderValue={new CalendarDate(1995, 11, 6)}
            labelPlacement={'outside'}

            startContent={
              <CalendarIcon />
            }
            onChange={onChange}

          />

          <p className="text-sm text-red-500">{errorText}</p>

        </div>
      )


    // You can edit the date

    case 'date_picker':
      return (

        // <DateInput
        //   label={placeholder.text + ' (mm-dd-yyyy)'}
        //   defaultValue={inputValue && Object.keys(inputValue).length != 0 ? parseDate(`${inputValue.year}-${formatNumber(inputValue.month)}-${formatNumber(inputValue.day)}`) : parseDate('2024-12-04')}
        //   placeholderValue={new CalendarDate(1995, 11, 6)}
        //   labelPlacement={'outside'}
        // errorMessage="Please enter a valid date."
        //   startContent={
        //     <CalendarIcon />
        //   }
        //   onChange={onChange}
        // />

        <div className="flex flex-col gap-2">

          <DatePicker
            label={placeholder.text + ' (mm-dd-yyyy)'}
            defaultValue={inputValue && Object.keys(inputValue).length != 0 ? parseDate(`${inputValue.year}-${formatNumber(inputValue.month)}-${formatNumber(inputValue.day)}`) : parseDate('2002-12-04')}
            labelPlacement={'outside'}
            errorMessage="Please enter a valid date."
            startContent={
              <CalendarIcon />
            }
            showMonthAndYearPickers
            onChange={onChange}
            isDisabled={isDisabled}

          />

          <p className="text-sm text-red-500">{errorText}</p>

        </div>
      )


    case 'select':
      return (

        <div className="flex flex-col gap-2">

          <Select
            label={placeholder.name}
            placeholder={placeholder.placeholder}
            labelPlacement="outside"
            disableSelectorIconRotation
            selectorIcon={<ScollIcon />}
            defaultSelectedKeys={placeholder.defaultSelectedKeys}
            startContent={placeholder.icon}
            onChange={onChange}
            className={className}
            isLoading={placeholder?.isLoaderVisible}
            selectionMode={placeholder?.isMultiple == true ? 'multiple' : 'single'}
            // selectedKeys={placeholder.selectedItems && placeholder.selectedItems}
            // selectedKeys={[inputValue]}
            // value={["acceptance_and_accompaniment"]}
            // selectedKeys={[inputValue]}
            selectedKeys={placeholder?.isMultiple == true ? inputValue : [inputValue]}
            isDisabled={isDisabled}

          >
            {
              placeholder.data.map((item) => (
                <SelectItem
                  key={item.id}
                  startContent={item?.startContent}
                  textValue={item.text}
                >
                  {
                    !item.subtext && <p>{item.text}</p>
                  }

                  {
                    item.text && item.subtext &&
                    <div className="flex flex-col">
                      <p className="text-dark-1">{item.text}</p>
                      <p className="text-text_color-1 text-xs">{item.subtext}</p>
                    </div>
                  }
                </SelectItem>
              ))
            }
          </Select >

          <p className="text-sm text-red-500">{errorText}</p>

        </div>
      )



    case 'select_with_loading_data':
      return (
        <div className="flex flex-col gap-2">

          <Select
            items={placeholder.data}
            label={placeholder.name}
            placeholder={placeholder.placeholder}
            labelPlacement="outside"
            disableSelectorIconRotation
            selectorIcon={<ScollIcon />}
            defaultSelectedKeys={[inputValue]}
            startContent={placeholder.icon}
            onChange={onChange}
            scrollRef={placeholder.scrollerRef}
            isLoading={placeholder.isLoading}
          >
            {(item) => (
              <SelectItem
                key={item.id}
                startContent={item?.startContent}
                className="capitalize">
                {item.text}
              </SelectItem>
            )}
          </Select>
          <p className="text-sm text-red-500">{errorText}</p>

        </div>

      )



    case 'normal_textarea':
      return (

        <div className="flex flex-col gap-2">

          <Textarea
            variant="bordered"
            placeholder={placeholder}
            defaultValue={inputValue}
            className="w-full"
            onChange={onChange}
            isDisabled={isDisabled}

          />
          <p className="text-sm text-red-500">{errorText}</p>

        </div>
      )





    case 'selector_text_with':

      // const [selectorInput, setSelectorInput] = useState()
      // const [textInput, setTextInput] = useState(inputValue)
      // const [selectroValue, setselectroValue] = useState(placeholder.inputValue)

      function chnageInputValue(e) {
        setSelectorInput(e.target.value)

        // onChange()
        onChange.onInputChange()
      }


      return (
        <div className="bg-red-400 flex items-end gap-2">
          <Select
            items={placeholder.selectorData}
            className="max-w-none w-[90px] h-[50px]"
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key}>
                  {item.icon}
                </div>
              ));
            }}
          >
            {(item) => (
              <SelectItem key={item.id}>
                {item.icon}
              </SelectItem>
            )}
          </Select>

          <Input
            className={cn('bg-green-700', className)}
            type="text"
            label={placeholder.inputName}
            placeholder={placeholder.placeholder}
            labelPlacement="outside"
            startContent={
              placeholder.inputIcon
            }
            classNames={cn('flex')}
            onChange={chnageInputValue}
            value={textInput}
          />
        </div>


      )







  }





}



// export function HtmlEmailInput({ type = "text", id, label }) {
//   return (
//     <Input className={className}
//       type="email"
//       label="Email"
//       placeholder="you@example.com"
//       labelPlacement="outside"
//       startContent={
//         <RiMailOpenLine size={16} />
//       }
//     />
//   )
// }

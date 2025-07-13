"use client"


import createToast from "@/app/assets/components/toast";
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import { documents_api } from "@/constants/_api";
import { AddNewFileIcon, AddressIcon, AddUserIcon, AdminIcon, BaccalaureateIcon, CalendarIcon, DestinationIcon, DocumentsIcon, EducationIcon, FileIcon, FlagIcon, IdentityIdIcon, LegalIcon, PassportIcon, PhoneIcon, SettingsIcon, TranslateIcon, UserAccountIcon, UserIcon, UsersIcon } from "@/constants/Icons";
import { available_languages } from "@/languages/available_languages";
import Image from "next/image";
import { useState } from "react";


const Title = ({ icon, title, text }) => {
  return (
    <div className="flex flex-col">
      <p className="text-xl font-semibold flex items-center gap-2">{icon}{title}</p>
      <p className="text-sm pl-7 text-text_color-1">{text}</p>
    </div>
  )
}





export default function AddUniversityDocumentForm() {

  const [isLoading, setIsLoading] = useState(false)

  const [documentName, setDocumentName] = useState()
  const [documentDescription, setDocumentDescription] = useState()




  function setDocumentDetails(stateName, e, target) {

    if (stateName == 'name') { // If the targeted state is the document name 
      setDocumentName(prev => { return { ...prev, [target]: e.target.value } })
    } else if (stateName == 'description') { // If the targeted state is the document description 
      setDocumentDescription(prev => { return { ...prev, [target]: e.target.value } })
    }

  }




  async function addNewUniversityDocument() {


    // Check if there is documentName && documentDescription 
    if (documentName && documentDescription) {
      // Check if documentName object has 3 keys: name_en, name_fr, name_ar
      if (Object.keys(documentName).length != 3) {
        createToast({ msg: `The document name in a particular language is missing!`, status: 'error' })
      }
      // Check if documentDescription object has 3 keys: description_en, description_fr, description_ar
      else if (Object.keys(documentDescription).length != 3) {
        createToast({ msg: `The document description in a particular language is missing!`, status: 'error' })
      }


      else {

        const names = JSON.stringify(documentName)
        const descriptions = JSON.stringify(documentDescription)

        try {
          setIsLoading(true)

          const response = await fetch(`${documents_api}/addUniversityDocument`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ admin_id: '', names, descriptions }),
            cache: 'no-cache',
            credentials: 'include'
          })

          const result = await response.json()

          console.log(result)

          if (result.err) {
            createToast(result.msg)
          } else {
            createToast({ msg: `The university document added successfully`, status: 'success' })
          }


        } catch (error) {
          console.log(error)
          createToast({ msg: `Something went wrong! Please try again.`, status: 'error' })
        } finally {
          setIsLoading(false)
        }
      }



    } else {
      createToast({ msg: `Document names or description are missing!`, status: 'error' })
    }

  }




  return (
    <div className="flex flex-col gap-[50px]">

      <div className="flex gap-5">

        <div className="flex flex-col gap-5 flex-1">
          <div className="flex flex-col gap-5">
            <Title
              icon={<FileIcon />}
              title="Document name"
              text="Here you enter the document name in languages"
            />

            {/* For typing inputs  */}
            <div className="grid grid-cols-2 gap-2 gap-y-5">

              {
                Object.keys(available_languages).map((lang) => {

                  const { key, name, logo } = available_languages[lang]

                  const LogoIcon = () => (
                    <Image
                      className="rounded-full"
                      src={`${logo}`}
                      height={20}
                      width={20}
                      alt={`${name} Country logo`}
                    />
                  )

                  return (
                    <HtmlInput
                      key={key}
                      type="text"
                      placeholder={{ text: `Name in ${name}`, placeholder: "Write here", icon: <LogoIcon /> }}
                      onChange={(e) => setDocumentDetails('name', e, key)}

                    />
                  )
                }

                )
              }

            </div>

          </div>
        </div>
      </div>

      <div className="flex gap-5">

        <div className="flex flex-col gap-5 flex-1">
          <div className="flex flex-col gap-5">
            <Title
              icon={<FileIcon />}
              title="Document description"
              text="Here you enter the document description in languages"
            />

            {/* For typing inputs  */}
            <div className="grid grid-cols-2 gap-2 gap-y-5">

              {
                Object.keys(available_languages).map((lang) => {

                  const { key, name, logo } = available_languages[lang]

                  const LogoIcon = () => (
                    <Image
                      className="rounded-full"
                      src={`${logo}`}
                      height={20}
                      width={20}
                      alt={`${name} Country logo`}
                    />
                  )

                  return (
                    <HtmlInput
                      key={key}
                      type="text"
                      placeholder={{ text: `Description in ${name}`, placeholder: "Write here", icon: <LogoIcon /> }}
                      onChange={(e) => setDocumentDetails('description', e, key)}

                    />
                  )
                }

                )
              }

            </div>

          </div>
        </div>
      </div>

      <HtmlActionHandlerButton
        text="Add new university document"
        icon={<AddNewFileIcon />}
        onClick={addNewUniversityDocument}
        isLoaderVisible={isLoading}
      />

    </div>
  )
}

"use client"


import createToast from "@/app/assets/components/toast";
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import { documents_api } from "@/constants/_api";
import { AddNewFileIcon, AddressIcon, AddUserIcon, AdminIcon, BaccalaureateIcon, CalendarIcon, DestinationIcon, DocumentsIcon, EducationIcon, FileIcon, FlagIcon, IdentityIdIcon, LegalIcon, PassportIcon, PhoneIcon, SettingsIcon, StatusIcon, SupportIcon, TextIcon, TimerIcon, TranslateIcon, UserAccountIcon, UserIcon, UsersIcon } from "@/constants/Icons";
import { available_languages } from "@/languages/available_languages";
import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination, Spinner, User, Button, Tooltip, AvatarGroup, Avatar } from "@nextui-org/react";
import Status from "../../../customers/(pages)/manageInvoices/[customerId]/components/Status";
import axios from "axios";
import { extractDateFromTimestamp } from "@/constants/functions";
import DocumentActionsDropbox from "./DocumentActionsDropbox";
import { Badge } from "@tremor/react";
import NoDocumentsToDisplay from "../../universityDocuments/components/NoDocumentsToDisplay";
import LoadingDocuments from "../../universityDocuments/components/LoadingDocuments";




export default function UpdateVisaDocumentForm() {

  const [isLoading, setIsLoading] = useState(false)
  const [loadingDocuments, setLoadingDocuments] = useState(true)

  const [allDocuments, setAllDocuments] = useState()



  useEffect(() => {

    async function getDocuments() {

      try {

        const { data: response } = await axios.get(`${documents_api}/getVisaDocuments`)


        const all_documents = []

        if (response?.data.length > 0) {

          for (let i = 0; i < response?.data.length; i++) {
            var { createdAt, key, _id, names, descriptions, status } = response.data[i]


            if (status == 'active') {
              status = ['Active', 'active']
            } if (status == 'unactive') {
              status = ['Unactive', 'unactive']
            } else if (status == 'completed') {
              status = ['Completed', 'completed']
            } else if (status == 'deleted') {
              status = ['Deleted', 'deleted']
            }


            all_documents.push({
              _id,
              key,
              names: JSON.parse(names),
              descriptions: JSON.parse(descriptions),
              status,
              createdAt: extractDateFromTimestamp(createdAt).finalFormattedDate
            })
          }

          console.log('All departements', all_documents)

          setAllDocuments(all_documents)




        }



      } catch (error) {
        console.log(error)
      } finally {
        setLoadingDocuments(false)
      }
    }

    getDocuments()

  }, [])


  return (
    // <div className="flex flex-col gap-[50px]">
    <Table
      removeWrapper
      className='bg-light-1 dark:bg-dark-1 rounded-xl border-1 overflow-hidden '
    >
      <TableHeader>
        <TableColumn key={'name'}>
          <div className='flex items-center gap-1'>
            <TextIcon />
            Name
          </div>
        </TableColumn>

        <TableColumn key={'description'}>
          <div className='flex items-center gap-1'>
            <TextIcon />
            Description
          </div>
        </TableColumn>

        <TableColumn key={'status'}>
          <div className='flex items-center gap-1'>
            <UserIcon />
            Status
          </div>
        </TableColumn>
        <TableColumn key={'added_at'}>
          <div className='flex items-center gap-1'>
            <CalendarIcon />
            Added at
          </div>
        </TableColumn>

        <TableColumn key={'actions'}>
          <div className='flex items-center gap-1'>
            <SettingsIcon />
            Actions
          </div>
        </TableColumn>

      </TableHeader>

      <TableBody isLoading={loadingDocuments} loadingContent={<LoadingDocuments />} emptyContent={<NoDocumentsToDisplay />}>
        {
          allDocuments && !loadingDocuments &&
          allDocuments.map(({ key, _id, names, descriptions, createdAt, status }) => (
            <TableRow key={key} className='border-b-1 last:border-none border-opacity-20'>





              <TableCell>
                <div className="pl-7">
                  <AvatarGroup isBordered={false}>
                    {
                      Object.keys(names).map((language) => {

                        const name = names[language]
                        const flag = available_languages[language].logo

                        return (
                          <Tooltip key={language} showArrow size="sm" delay={500} content={name}>
                            <Avatar className="border-3 border-dark-1" size={'sm'} src={flag} />
                          </Tooltip>
                        )
                      })
                    }
                  </AvatarGroup>
                </div>

              </TableCell>



              <TableCell>
                <div className="pl-7">
                  <AvatarGroup >
                    {
                      Object.keys(descriptions).map((language) => {

                        const description = descriptions[language]
                        const flag = available_languages[language].logo

                        return (
                          <Tooltip key={language} showArrow size="sm" delay={500} content={description}>
                            <Avatar className="border-3 border-dark-1" size={'sm'} src={flag} />
                          </Tooltip>
                        )
                      })
                    }
                  </AvatarGroup>

                </div>
              </TableCell>



              <TableCell>

                <div>
                  {
                    status[1] == 'active' &&
                    <Status color={"bg-green-700"} text={status[0]} borderColor={'border-green-700'} />
                  }
                  {
                    status[1] == 'completed' &&
                    <Status color={"bg-blue-700"} text={status[0]} borderColor={'border-blue-400'} />
                  }
                  {
                    status[1] == 'unactive' &&
                    <Status color={"bg-yellow-600"} text={status[0]} borderColor={'border-red-400'} />
                  }

                  {
                    status[1] == 'deleted' &&
                    <Status color={"bg-red-600"} text={status[0]} borderColor={'border-red-400'} />
                  }
                </div>

              </TableCell>
              <TableCell>
                <p className='text-xs rounded-3xl px-3 py-1 w-fit'>{createdAt}</p>
              </TableCell>

              <TableCell>
                <DocumentActionsDropbox id={_id} />
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>

  )
}

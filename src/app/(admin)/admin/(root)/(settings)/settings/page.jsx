'use client'

import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import { Button } from "@nextui-org/react";
import { PhoneIcon, SaveIcon, SettingsIcon } from "@/constants/Icons";
import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { app_images_routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import phone_number_providers from "@/constants/phone_number_providers";
import { admins_api } from "@/constants/_api";
import createToast from "@/app/assets/components/toast";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"


import axios from "axios";

export default function Settings() {
  const [them, setThem] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [adminData, setAdminData] = useCookies(['admin_data']);
  const admin_data = adminData.admin_data
  // const { username, full_name, email, favorite_theme, avatar, role, _id } = adminData.admin_data

  const [admin, setAdmin] = useState()
  const [birthdayState, setBirthdayState] = useState()

  const [dataToUpdate, setDataToUpdate] = useState({});

  // Get admin data from backend 
  useEffect(() => {
    // console.log('Cookies: ', adminCookie)

    async function fetch_data() {
      try {
        const { _id } = adminData.admin_data

        const response = await fetch(`${admins_api}/getAdminData`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id }),
          cache: 'no-cache',
          credentials: 'include'
        })

        const { data } = await response.json()

        console.log(data)

        var this_birthday = JSON.parse(data.birthday)

        // Set data for inputs 
        setAdmin(prevState => { return { ...prevState, full_name: data.full_name } })
        setAdmin(prevState => { return { ...prevState, birthday: this_birthday } })
        setAdmin(prevState => { return { ...prevState, phone_number: data.phone_number } })
        setAdmin(prevState => { return { ...prevState, phone_number_provider: data.phone_number_provider } })
        setAdmin(prevState => { return { ...prevState, username: data.username } })
        setAdmin(prevState => { return { ...prevState, email: data.email } })
        setAdmin(prevState => { return { ...prevState, favorite_theme: data.favorite_theme } })
        setAdmin(prevState => { return { ...prevState, avatar: data.avatar } })
        setAdmin(prevState => { return { ...prevState, avatarUrl: data.avatar } })
        setAdmin(prevState => { return { ...prevState, _id: data._id } })
        setAdmin(prevState => { return { ...prevState, password: "" } })
        setBirthdayState(this_birthday)


        setThem(data.favorite_theme)

      } catch (error) {
        console.log(error)
        createToast('Some error happend!')
      }
    }

    fetch_data()

  }, []);


  // Update profile function 
  async function handleUpdateProfile() {

    if (dataToUpdate.password && dataToUpdate.password != '') {

      const formData = new FormData()
      const { _id } = adminData.admin_data

      const dataToUpdate__keys = Object.keys(dataToUpdate)

      for (let i = 0; i < dataToUpdate__keys.length; i++) {
        const key = dataToUpdate__keys[i]
        const value = dataToUpdate[key]

        // If value is empty, then delete the key 
        if (value == '') {
          delete dataToUpdate[key]
        }

      }

      // console.log(dataToUpdate)

      if (dataToUpdate__keys.length > 0) {
        setIsLoading(true)
        try {

          for (let i = 0; i < dataToUpdate__keys.length; i++) {
            const key = dataToUpdate__keys[i]
            var value = dataToUpdate[key]
            if (key == 'birthday') {
              value = JSON.stringify(birthdayState)
            }
            formData.append(key, value)
          }

          formData.append('admin_id', _id)

          const config = { headers: { 'Content-Type': 'multipart/form-data' } }
          const response = await axios.post(`${admins_api}/updateGeneralSettings`, formData, config)
          var { err, msg } = response.data

          if (err) {
            const content = msg
            createToast(content, true)
          } else {

            var { data } = response.data


            const content = msg
            createToast(content, true)

            setIsDialogOpen(false)


            // Update cookies
            const updated_admin_data = data

            console.log(updated_admin_data)


            setAdminData('admin_data', updated_admin_data)


            // Reset dataToUpdate state 
            setDataToUpdate({})

            // console.log("All updated data:", data)

            setThem(data.favorite_theme)
          }


          setIsLoading(false)

        } catch (error) {
          console.log('error', error)
        } finally {
          setIsLoading(false)
        }

      } else {

        // console.log(admin)
        // const content = ['All inputs are required', 'Make sure to fill all inputs below']
        const content = ['Nothing to update', 'There is no changes to save.']
        createToast(content, true)
      }


    } else {
      const content = ['Password is missing!', 'Please write your password to update your profile.']
      createToast(content, true)
    }

  }


  function Dot() {
    return <span className="h-1 w-1 rounded-full bg-gray-400"></span>
  }

  // Set the admin state when the user changes the inputs values 
  function setState(e, target) {

    setAdmin(prevState => { return { ...prevState, [target]: e.target.value } })

    dataToUpdate[target] = e.target.value
    setDataToUpdate(prev => ({ ...prev, [target]: e.target.value }))
  }




  function setStateForBirthday(e) {
    var day = e.day
    var month = e.month
    var year = e.year
    var this_birthday = {
      day,
      month,
      year,
    }
    setDataToUpdate(prev => ({ ...prev, 'birthday': this_birthday }))
    setBirthdayState(this_birthday)
  }


  function setStateForSelector(e, target) {
    var value = e.target.value
    setAdmin(prevState => { return { ...prevState, [target]: value } })
    setDataToUpdate(prev => ({ ...prev, [target]: value }))
  }


  // Set phone number providers 
  const all_phone_numbers_providers = []
  phone_number_providers.forEach(item => {

    all_phone_numbers_providers.push({
      id: item.key,
      text: item.name,
      startContent: '',
    })
  })


  function change_theme(theme) {
    setThem(theme)
    setAdmin(prevState => { return { ...prevState, favorite_theme: theme } })

    // Add theme state to the updated fields 
    setDataToUpdate(prev => ({ ...prev, favorite_theme: theme }))

  }


  // Open password dialog if these is any changes 
  function showPasswordDialog() {
    const dataToUpdate__keys = Object.keys(dataToUpdate)

    // Delete password value if exist in the object 
    if (dataToUpdate.password) {
      delete dataToUpdate.password
    }


    for (let i = 0; i < dataToUpdate__keys.length; i++) {
      const key = dataToUpdate__keys[i]
      const value = dataToUpdate[key]
      // If value is empty, then delete the key 
      if (value == '') {
        delete dataToUpdate[key]
      }
    }



    const isObjectHasAnyValues = Object.keys(dataToUpdate).length > 0

    if (isObjectHasAnyValues) {
      setIsDialogOpen(true)
    } else {
      setIsDialogOpen(false)
      const content = ['Nothing to update', 'There is no changes to save.']
      createToast(content, true)
    }
  }


  // function setImage(e) {
  //   if (e) {
  //     setAdmin(prevState => { return { ...prevState, avatar: e } })
  //     setDataToUpdate(prev => ({ ...prev, avatar: e }))
  //   }
  // }


  function setImage(files) {
    if (files) {
      const file = files[0].file
      setAdmin(prevState => { return { ...prevState, avatar: file } })
      setDataToUpdate(prev => ({ ...prev, avatar: file }))

    }
  }


  return (
    <div className="flex flex-col gap-4">
      <span className="flex items-center gap-2 text-sm">
        <p>Profile picture</p>
        <Dot />
        <p>General settings</p>
        <Dot />
        <p>Theme</p>
      </span>

      {
        admin &&
        <div className="flex flex-col gap-4">
          <div className="p-5 pt-5 pb-5 flex flex-col gap-4 bg-light-2 dark:bg-dark-2 w-full rounded-md h-fit">
            <p className="text-base font-semibold">Profile picture</p>
            <div className="flex w-full flex-col">

              <div className="w-[120px] h-[120px]">


                <HtmlInput
                  type="customized_file"
                  onChange={(files) => setImage(files)}
                  supported_format="image"
                  placeholder={{ onlyIcon: true, fileType: 'image', isLivePreview: true }}
                  inputValue={`${app_images_routes.adminAvatars}/${admin.avatarUrl}`}

                />

              </div>

            </div>

          </div>

          <div className="p-5 pt-5 pb-5 flex flex-col gap-4 bg-light-2 dark:bg-dark-2 w-full rounded-md h-fit">
            <p className="text-base font-semibold">General settings</p>
            <div className="flex w-full flex-col">

              <div className="grid grid-cols-2 gap-4 ">
                <HtmlInput
                  type="name"
                  placeholder='Full name'
                  onChange={(e) => setState(e, 'full_name')}
                  inputValue={admin.full_name}
                />

                <HtmlInput
                  type="date_picker"
                  placeholder={{ text: 'Your birthday' }}
                  inputValue={admin?.birthday}
                  onChange={(e) => setStateForBirthday(e)}
                />

                <HtmlInput
                  type="number"
                  placeholder={{ text: 'Phone number', placeholder: "0700000000", icon: <PhoneIcon />, maxLength: 10 }}
                  onChange={(e) => setState(e, 'phone_number')}
                  inputValue={admin?.phone_number || ''}
                />

                <HtmlInput
                  type="select"
                  placeholder={{ name: 'Phone number provider', placeholder: 'Select phone number provider', data: all_phone_numbers_providers, icon: <SettingsIcon /> }}
                  onChange={(e) => setStateForSelector(e, 'phone_number_provider')}
                  inputValue={admin.phone_number_provider}

                />

                <HtmlInput
                  type="name"
                  placeholder='Your username'
                  onChange={(e) => setState(e, 'username')}
                  inputValue={admin?.username || ''}
                />


                <HtmlInput
                  type="email"
                  placeholder='Work email'
                  onChange={(e) => setState(e, 'email')}
                  inputValue={admin?.email || ''}
                />

              </div>

            </div>
          </div>


          <div className="p-5 pt-5 pb-5 flex flex-col gap-4 bg-light-2 dark:bg-dark-2 w-full rounded-md h-fit">
            <p className="text-base font-semibold">Theme</p>
            <div className="flex w-full flex-col">

              <div className="flex flex-col gap-4 ">
                <div className="flex items-center gap-7">

                  <div
                    className={cn(`flex cursor-pointer items-center relative border-2 border-transparent h-[150px] w-[250px] rounded-lg bg-gray-600 bg-opacity-80 ${them == 'dark' && 'border-own_primary-1'}`)}
                    onClick={() => change_theme('dark')}
                  >
                    <div className="w-[85%] h-[120px] ml-auto bg-dark-1 rounded-l-2xl p-2">
                      <p className="text-3xl font-bold text-light-1">Aa</p>
                    </div>
                  </div>


                  <div
                    className={cn(`flex cursor-pointer items-center relative h-[150px] w-[250px] border-2 border-transparent rounded-lg bg-gray-600 bg-opacity-80 ${them == 'light' && 'border-own_primary-1'}`)}
                    onClick={() => change_theme('light')}
                  >
                    <div className="w-[85%] h-[120px] ml-auto bg-light-1 rounded-l-2xl p-2">
                      <p className="text-3xl font-bold text-dark-1">Aa</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      }


      {/* <AlertDialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)} > */}
      <AlertDialog open={isDialogOpen} >
        <AlertDialogTrigger asChild>
          <HtmlActionHandlerButton
            text="Save changes"
            icon={<SaveIcon />}
            onClick={showPasswordDialog}
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px] bg-light-1 dark:bg-dark-1">
          <AlertDialogHeader>
            <AlertDialogTitle>Set your password</AlertDialogTitle>
            <AlertDialogDescription>
              Write your password to apply changes to your profile
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center">

            <HtmlInput
              type="password"
              placeholder='Your password'
              onChange={(e) => setState(e, 'password')}
            />
          </div>
          <AlertDialogFooter>
            <Button
              onClick={() => setIsDialogOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>


            <HtmlActionHandlerButton
              text="Save changes"
              icon={<SaveIcon />}
              onClick={handleUpdateProfile}
              isLoaderVisible={isLoading}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>



    </div>

  )
}

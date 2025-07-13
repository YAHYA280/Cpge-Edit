"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

import { cpe_api } from '@/constants/_api';

import PageName from "@/app/(admin)/assets/components/PageName";
import TableSkeleten from '@/app/assets/components/TableSkeleten';

export default function Countries() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([])
  const [isErrorExist, setIsErrorExist] = useState({
    title: '',
    text: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(`${cpe_api}?target=countries`);
        setCountries(response);
      } catch (error) {
        console.log(error.message);
        setIsErrorExist({
          title: 'Something went wrong',
          text: 'Something unknown went wrong! Please retry again.',
        })
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  return (
    <div className="flex flex-col gap-4">
      <PageName pageName='Countries' />

      Tables 
    </div>
  )
}


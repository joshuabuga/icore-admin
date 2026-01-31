import React, {useState} from "react";
import {CustomersToBeCredited} from "@/types/crediting";


export function useCSV() {
    const [extractedData, setExtractedData] = useState<CustomersToBeCredited[]>()
    const [file, setFile] = useState<File>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string|Error>()
    const [creditedCustomers, setCreditedCustomers] = useState<CustomersToBeCredited[]>()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setFile(file)
            // Reset previous data when new file is selected
            setCreditedCustomers(undefined)
            setError(undefined)
        }
    }

    const extractCSVData = async() => {
        if (!file) {
            setError(new Error("No file selected"))
            return
        }

        const formData = new FormData()
        formData.set('file', file)
        
        try {
            setLoading(true)
            setError(undefined)
            
            const response = await fetch('/api/csv-parser', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const customers = await response.json()
            
            // Validate the extracted data
            if (!Array.isArray(customers) || customers.length === 0) {
                throw new Error("No valid customer data found in CSV file")
            }

            // Validate each customer record
            const validCustomers = customers.filter(customer => 
                customer.name && 
                customer.phoneNumber && 
                customer.amount && 
                !isNaN(Number(customer.amount))
            ) as CustomersToBeCredited[]

            if (validCustomers.length === 0) {
                throw new Error("No valid customer records found. Please check CSV format.")
            }

            if (validCustomers.length < customers.length) {
                console.warn(`${customers.length - validCustomers.length} invalid records were filtered out`)
            }

            setCreditedCustomers(validCustomers)
            setExtractedData(validCustomers)

            // Upload CSV to cloud storage (fire and forget)
            const uploadFormData = new FormData()
            uploadFormData.set('file', file)
            uploadFormData.set('folder', 'csv/uploads')
            fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData
            }).catch(err => console.error('Failed to upload CSV backup:', err))

            return validCustomers
        } catch (e) {
            console.error('Error extracting CSV data:', e)
            setError(e instanceof Error ? e : new Error(String(e)))
            setCreditedCustomers(undefined)
            throw e
        } finally {
            setLoading(false)
        }
    }

    const creditCustomers = async(customerList: CustomersToBeCredited[]) => {
        try {
            setLoading(true)
            setError(undefined)
            
            const response = await fetch('/api/credit-customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerList)
            })
            
            const result = await response.json()
            
            if (response.ok) {
                return result
            } else {
                throw new Error(result.message || 'Failed to credit customers')
            }
        } catch (e) {
            console.error('Error crediting customers:', e)
            setError(e instanceof Error ? e : new Error(String(e)))
            throw e
        } finally {
            setLoading(false)
        }
    }

    const resetData = () => {
        setExtractedData(undefined)
        setFile(undefined)
        setCreditedCustomers(undefined)
        setError(undefined)
    }

    return {
        loading,
        error,
        creditCustomers,
        extractedData,
        handleFileChange,
        extractCSVData,
        creditedCustomers,
        setCreditedCustomers,
        resetData,
        file,
    }
}
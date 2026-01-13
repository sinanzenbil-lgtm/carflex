'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, X, Image as ImageIcon } from 'lucide-react'
import { useAdmin } from '../../../context/AdminContext'

// Araç parçaları listesi
const vehicleParts = [
  'Ön Kaput',
  'Sağ Ön Çamurluk',
  'Sağ Kapı',
  'Sağ Arka Kapı',
  'Sağ Arka Çamurluk',
  'Bagaj Kapağı',
  'Sol Arka Çamurluk',
  'Sol Arka Kapı',
  'Sol Ön Kapı',
  'Sol Ön Çamurluk',
]

export default function EditVehiclePage() {
  const router = useRouter()
  const params = useParams()
  const { getAuthHeaders } = useAdmin()
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    transmission: 'Manuel',
    purchasePrice: '',
    licensePlate: '',
    licenseNumber: '',
    chassisNumber: '',
    engineNumber: '',
    color: '',
    damagedParts: [] as string[],
    paintedParts: [] as string[],
    replacedParts: [] as string[],
    inspectionReport: '',
    inspectionEndDate: '',
    insuranceEndDate: '',
    kaskoEndDate: '',
    nextMaintenanceKm: '',
    licenseDocument: '',
    insurancePolicy: '',
    lastKilometer: 0,
    isLongTerm: true,
    dailyPrice: '',
    monthlyPrice: '',
    isActive: true,
    isPublished: false,
  })
  const [licensePreview, setLicensePreview] = useState<string>('')
  const [insurancePreview, setInsurancePreview] = useState<string>('')
  const [vehicleImages, setVehicleImages] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} dosyası 2MB'dan büyük. Lütfen daha küçük bir dosya seçin.`)
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setVehicleImages((prev) => [...prev, base64])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setVehicleImages((prev) => prev.filter((_, i) => i !== index))
  }

  useEffect(() => {
    if (params.id) {
      fetchVehicle()
    }
  }, [params.id])

  const fetchVehicle = async () => {
    try {
      const res = await fetch(`/api/vehicles/${params.id}`, {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      if (res.ok) {
        const data = await res.json()
        const inspectionEndDate = data.inspectionEndDate 
          ? new Date(data.inspectionEndDate).toISOString().split('T')[0]
          : ''
        const insuranceEndDate = data.insuranceEndDate
          ? new Date(data.insuranceEndDate).toISOString().split('T')[0]
          : ''
        const kaskoEndDate = data.kaskoEndDate
          ? new Date(data.kaskoEndDate).toISOString().split('T')[0]
          : ''

        setFormData({
          brand: data.brand || '',
          model: data.model || '',
          year: data.year || new Date().getFullYear(),
          transmission: data.transmission || 'Manuel',
          purchasePrice: data.purchasePrice?.toString() || '',
          licensePlate: data.licensePlate || '',
          licenseNumber: data.licenseNumber || '',
          chassisNumber: data.chassisNumber || '',
          engineNumber: data.engineNumber || '',
          color: data.color || '',
          damagedParts: data.damagedParts 
            ? (typeof data.damagedParts === 'string' 
                ? (() => { try { return JSON.parse(data.damagedParts) } catch { return data.damagedParts.split(',').map((p: string) => p.trim()).filter(Boolean) } })()
                : Array.isArray(data.damagedParts) ? data.damagedParts : [])
            : [],
          paintedParts: data.paintedParts 
            ? (typeof data.paintedParts === 'string' 
                ? (() => { try { return JSON.parse(data.paintedParts) } catch { return data.paintedParts.split(',').map((p: string) => p.trim()).filter(Boolean) } })()
                : Array.isArray(data.paintedParts) ? data.paintedParts : [])
            : [],
          replacedParts: data.replacedParts 
            ? (typeof data.replacedParts === 'string' 
                ? (() => { try { return JSON.parse(data.replacedParts) } catch { return data.replacedParts.split(',').map((p: string) => p.trim()).filter(Boolean) } })()
                : Array.isArray(data.replacedParts) ? data.replacedParts : [])
            : [],
          inspectionReport: data.inspectionReport || '',
          inspectionEndDate,
          insuranceEndDate,
          kaskoEndDate,
          nextMaintenanceKm: data.nextMaintenanceKm?.toString() || '',
          licenseDocument: data.licenseDocument || '',
          insurancePolicy: data.insurancePolicy || '',
          lastKilometer: data.lastKilometer || 0,
          isLongTerm: data.isLongTerm !== false,
          dailyPrice: data.dailyPrice?.toString() || '',
          monthlyPrice: data.monthlyPrice?.toString() || '',
          isActive: data.isActive !== false,
          isPublished: data.isPublished || false,
        })

        // Preview'ları ayarla
        if (data.licenseDocument && data.licenseDocument.startsWith('data:image/')) {
          setLicensePreview(data.licenseDocument)
        }
        if (data.insurancePolicy && data.insurancePolicy.startsWith('data:image/')) {
          setInsurancePreview(data.insurancePolicy)
        }

        // Mevcut fotoğrafları yükle
        if (data.images) {
          try {
            const parsedImages = typeof data.images === 'string' ? JSON.parse(data.images) : data.images
            if (Array.isArray(parsedImages)) {
              setVehicleImages(parsedImages)
            }
          } catch (e) {
            console.error('Error parsing images:', e)
          }
        }
      } else {
        alert('Araç bulunamadı')
        router.push('/admin/vehicles')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Araç yüklenirken hata oluştu')
      router.push('/admin/vehicles')
    } finally {
      setLoadingData(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Array'leri JSON string'e çevir ve veri hazırla
      const submitData: any = {}
      
      // Zorunlu alanlar
      if (formData.brand) submitData.brand = formData.brand
      if (formData.model) submitData.model = formData.model
      if (formData.year) submitData.year = formData.year
      if (formData.transmission) submitData.transmission = formData.transmission
      if (formData.purchasePrice) submitData.purchasePrice = formData.purchasePrice
      if (formData.licensePlate) submitData.licensePlate = formData.licensePlate
      
      // Null olabilen alanlar
      submitData.licenseNumber = formData.licenseNumber || null
      submitData.chassisNumber = formData.chassisNumber || null
      submitData.engineNumber = formData.engineNumber || null
      submitData.color = formData.color || null
      submitData.inspectionReport = formData.inspectionReport || null
      submitData.licenseDocument = formData.licenseDocument || null
      submitData.insurancePolicy = formData.insurancePolicy || null
      
      // JSON string alanlar
      submitData.damagedParts = formData.damagedParts.length > 0 ? JSON.stringify(formData.damagedParts) : null
      submitData.paintedParts = formData.paintedParts.length > 0 ? JSON.stringify(formData.paintedParts) : null
      submitData.replacedParts = formData.replacedParts.length > 0 ? JSON.stringify(formData.replacedParts) : null
      submitData.images = vehicleImages.length > 0 ? JSON.stringify(vehicleImages) : null
      
      // Tarih alanları
      submitData.inspectionEndDate = formData.inspectionEndDate || null
      submitData.insuranceEndDate = formData.insuranceEndDate || null
      submitData.kaskoEndDate = formData.kaskoEndDate || null
      
      // Number alanlar
      submitData.lastKilometer = formData.lastKilometer || 0
      submitData.dailyPrice = formData.dailyPrice || null
      submitData.monthlyPrice = formData.monthlyPrice || null
      submitData.nextMaintenanceKm = formData.nextMaintenanceKm || null
      
      // Boolean alanlar - her zaman gönder (true veya false)
      submitData.isLongTerm = formData.isLongTerm === true
      submitData.isActive = formData.isActive === true
      submitData.isPublished = formData.isPublished === true

      console.log('Submitting data:', submitData)
      console.log('Boolean fields:', {
        isLongTerm: submitData.isLongTerm,
        isActive: submitData.isActive,
        isPublished: submitData.isPublished,
      })

      const res = await fetch(`/api/vehicles/${params.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (res.ok) {
        router.push('/admin/vehicles')
      } else {
        const error = await res.json()
        console.error('Update error:', error)
        alert(error.error || error.message || 'Araç güncellenirken hata oluştu')
      }
    } catch (error: any) {
      console.error('Error:', error)
      alert(error.message || 'Araç güncellenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/vehicles"
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Araç Düzenle</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marka *
            </label>
            <input
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model *
            </label>
            <input
              type="text"
              required
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Yıl *
            </label>
            <select
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            >
              {Array.from({ length: 31 }, (_, i) => {
                const year = new Date().getFullYear() - i
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şanzıman *
            </label>
            <select
              required
              value={formData.transmission}
              onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            >
              <option value="Manuel">Manuel</option>
              <option value="Otomatik">Otomatik</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plaka *
            </label>
            <input
              type="text"
              required
              value={formData.licensePlate}
              onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              placeholder="34ABC123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Satın Alma Tutarı
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.purchasePrice}
              onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ruhsat Numarası
            </label>
            <input
              type="text"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şase Numarası
            </label>
            <input
              type="text"
              value={formData.chassisNumber}
              onChange={(e) => setFormData({ ...formData, chassisNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motor Numarası
            </label>
            <input
              type="text"
              value={formData.engineNumber}
              onChange={(e) => setFormData({ ...formData, engineNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Renk
            </label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Son Kilometre
            </label>
            <input
              type="number"
              value={formData.lastKilometer}
              onChange={(e) => setFormData({ ...formData, lastKilometer: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kiralama Tipi *
            </label>
            <select
              required
              value={formData.isLongTerm ? 'long' : 'short'}
              onChange={(e) => setFormData({ ...formData, isLongTerm: e.target.value === 'long' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            >
              <option value="long">Uzun Dönem</option>
              <option value="short">Kısa Dönem (Günlük)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durum
            </label>
            <select
              value={formData.isActive ? 'active' : 'inactive'}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
          </div>

          {formData.isLongTerm ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aylık Kiralama Fiyatı (₺) - KDV Dahil
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.monthlyPrice}
                onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Günlük Kiralama Fiyatı (₺) - KDV Dahil
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.dailyPrice}
                onChange={(e) => setFormData({ ...formData, dailyPrice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
            </div>
          )}

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Ana sayfada yayımla
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-8">
              Bu seçeneği işaretlerseniz araç ana sayfada görünecektir
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Araç Fotoğrafları
            </label>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="vehicle-images-input-edit"
              />
              <label
                htmlFor="vehicle-images-input-edit"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <ImageIcon className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Fotoğraf Ekle</span>
              </label>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Birden fazla fotoğraf seçebilirsiniz (Maksimum 2MB/fotoğraf)
              </p>
              
              {vehicleImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {vehicleImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Araç fotoğrafı ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Hasar Kısımları
            </label>
            <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {vehicleParts.map((part) => (
                  <label key={part} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.damagedParts.includes(part)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            damagedParts: [...formData.damagedParts, part],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            damagedParts: formData.damagedParts.filter((p) => p !== part),
                          })
                        }
                      }}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-900">{part}</span>
                  </label>
                ))}
              </div>
            </div>
            {formData.damagedParts.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                Seçilen: {formData.damagedParts.join(', ')}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Boyalı Kısımlar
            </label>
            <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {vehicleParts.map((part) => (
                  <label key={part} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.paintedParts.includes(part)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            paintedParts: [...formData.paintedParts, part],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            paintedParts: formData.paintedParts.filter((p) => p !== part),
                          })
                        }
                      }}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-900">{part}</span>
                  </label>
                ))}
              </div>
            </div>
            {formData.paintedParts.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                Seçilen: {formData.paintedParts.join(', ')}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Değişen Kısımlar
            </label>
            <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {vehicleParts.map((part) => (
                  <label key={part} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.replacedParts.includes(part)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            replacedParts: [...formData.replacedParts, part],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            replacedParts: formData.replacedParts.filter((p) => p !== part),
                          })
                        }
                      }}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-900">{part}</span>
                  </label>
                ))}
              </div>
            </div>
            {formData.replacedParts.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                Seçilen: {formData.replacedParts.join(', ')}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ekspertiz Raporu
            </label>
            <textarea
              value={formData.inspectionReport}
              onChange={(e) => setFormData({ ...formData, inspectionReport: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Muayene Bitiş Tarihi
            </label>
            <input
              type="date"
              value={formData.inspectionEndDate}
              onChange={(e) => setFormData({ ...formData, inspectionEndDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sigorta Bitiş Tarihi
            </label>
            <input
              type="date"
              value={formData.insuranceEndDate}
              onChange={(e) => setFormData({ ...formData, insuranceEndDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ruhsat Belgesi
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        const base64 = reader.result as string
                        setFormData({ ...formData, licenseDocument: base64 })
                        if (file.type.startsWith('image/')) {
                          setLicensePreview(base64)
                        } else {
                          setLicensePreview('')
                        }
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              {licensePreview && (
                <div className="flex items-center gap-2">
                  <img src={licensePreview} alt="Ruhsat önizleme" className="w-20 h-20 object-contain border border-gray-300 rounded" />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, licenseDocument: '' })
                      setLicensePreview('')
                    }}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Kaldır
                  </button>
                </div>
              )}
              {formData.licenseDocument && !licensePreview && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">PDF yüklendi</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, licenseDocument: '' })}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Kaldır
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG veya PDF formatında yükleyebilirsiniz</p>
            {formData.licenseDocument && (
              <div className="mt-2">
                <a
                  href={formData.licenseDocument}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm underline"
                >
                  Ruhsat Belgesini Görüntüle
                </a>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trafik Sigortası Poliçesi
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        const base64 = reader.result as string
                        setFormData({ ...formData, insurancePolicy: base64 })
                        if (file.type.startsWith('image/')) {
                          setInsurancePreview(base64)
                        } else {
                          setInsurancePreview('')
                        }
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              {insurancePreview && (
                <div className="flex items-center gap-2">
                  <img src={insurancePreview} alt="Sigorta önizleme" className="w-20 h-20 object-contain border border-gray-300 rounded" />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, insurancePolicy: '' })
                      setInsurancePreview('')
                    }}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Kaldır
                  </button>
                </div>
              )}
              {formData.insurancePolicy && !insurancePreview && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">PDF yüklendi</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, insurancePolicy: '' })}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Kaldır
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG veya PDF formatında yükleyebilirsiniz</p>
            {formData.insurancePolicy && (
              <div className="mt-2">
                <a
                  href={formData.insurancePolicy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm underline"
                >
                  Sigorta Poliçesini Görüntüle
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? 'Güncelleniyor...' : 'Güncelle'}
          </button>
          <Link
            href="/admin/vehicles"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  )
}

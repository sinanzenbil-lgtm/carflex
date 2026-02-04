import { blogPosts } from '@/lib/blog'

export default function AdminBlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Blog Yönetimi</h1>
          <p className="text-gray-600">Yeni yazı ekleyin veya mevcut yazıları düzenleyin.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Yeni Blog Yazısı</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                <input
                  type="text"
                  placeholder="Başlık girin"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tarih</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <input
                  type="text"
                  placeholder="Kategori"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Görsel URL</label>
                <input
                  type="text"
                  placeholder="/blog-1.png"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blog Yazısı</label>
                <textarea
                  rows={6}
                  placeholder="Blog içeriği"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <button className="bg-lime-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-lime-600 transition-colors">
                Kaydet
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Mevcut Yazılar</h2>
            <div className="space-y-4">
              {blogPosts.slice(0, 6).map((post) => (
                <div key={post.slug} className="border border-gray-200 rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">{post.category}</div>
                  <div className="font-semibold text-slate-900">{post.title}</div>
                  <div className="text-xs text-gray-500 mt-2">{post.date}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Bu ekran tasarım amaçlıdır. Veritabanı bağlantısı yoktur.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

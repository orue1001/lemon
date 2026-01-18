import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useLanguage } from '../context/LanguageContext';

function Guestbook() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', content: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching posts:', error);
    else setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.content || !form.password) {
      alert(t.guestbook.alertAll);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from('guestbook')
      .insert([form]);

    if (error) {
      console.error('Error submitting post:', error);
      alert('Error submitting post');
    } else {
      setForm({ name: '', content: '', password: '' });
      fetchPosts();
    }
    setSubmitting(false);
  };

  const handleDelete = async (id, storedPassword) => {
    const inputPassword = prompt(t.guestbook.promptPw);
    if (!inputPassword) return;

    if (inputPassword !== storedPassword) {
      alert(t.guestbook.alertPw);
      return;
    }

    const { error } = await supabase
      .from('guestbook')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      alert('Delete failed');
    } else {
      fetchPosts();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-black mb-6 tracking-tight text-center text-lemon-text">{t.guestbook.title}</h2>
      
      <div className="bg-lemon-bg-dark/50 p-6 rounded-3xl border border-white/10 mb-8 shadow-sm backdrop-blur-sm">
        <div className="space-y-4">
          <textarea 
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder={t.guestbook.placeholder}
            className="w-full bg-black/30 text-lemon-text border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-lemon-primary placeholder:text-lemon-text/30 h-24 resize-none text-sm"
          ></textarea>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t.guestbook.namePlaceholder}
              className="flex-1 bg-black/30 text-lemon-text border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lemon-primary placeholder:text-lemon-text/30 text-sm" 
            />
            <input 
              type="password" 
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={t.guestbook.pwPlaceholder}
              className="flex-1 bg-black/30 text-lemon-text border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lemon-primary placeholder:text-lemon-text/30 text-sm" 
            />
            <button 
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-lemon-primary text-black px-6 py-2 rounded-xl font-bold hover:bg-lemon-tertiary transition-colors disabled:opacity-50 text-sm"
            >
              {submitting ? t.guestbook.submitting : t.guestbook.submit}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 pb-10">
        {loading ? (
          <p className="text-center text-lemon-text/60">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-lemon-text/60">{t.guestbook.empty}</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-lemon-bg-dark/40 p-5 rounded-2xl border border-white/5 shadow-sm hover:bg-lemon-bg-dark/60 transition-colors backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-lemon-text">{post.name}</span>
                  <span className="text-[10px] text-lemon-text/40">{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <button 
                  onClick={() => handleDelete(post.id, post.password)}
                  className="text-[10px] text-red-400 hover:text-red-300 font-medium px-2 py-1 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  {t.guestbook.delete}
                </button>
              </div>
              <p className="whitespace-pre-wrap text-sm text-lemon-text/80">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Guestbook;
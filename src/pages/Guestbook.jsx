import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function Guestbook() {
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
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from('guestbook')
      .insert([form]);

    if (error) {
      console.error('Error submitting post:', error);
      alert('글 작성에 실패했습니다.');
    } else {
      setForm({ name: '', content: '', password: '' });
      fetchPosts();
    }
    setSubmitting(false);
  };

  const handleDelete = async (id, storedPassword) => {
    const inputPassword = prompt('비밀번호를 입력하세요:');
    if (!inputPassword) return;

    if (inputPassword !== storedPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const { error } = await supabase
      .from('guestbook')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      alert('삭제 실패');
    } else {
      fetchPosts();
    }
  };

  return (
    <div className="py-10 max-w-2xl mx-auto">
      <h2 className="text-4xl font-black mb-10 tracking-tight text-center">GUESTBOOK</h2>
      
      <div className="bg-white/50 p-6 rounded-3xl border border-white mb-12 shadow-sm backdrop-blur-sm">
        <div className="space-y-4">
          <textarea 
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="메시지를 남겨주세요!" 
            className="w-full bg-white border border-lemon-bg-dark/20 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-lemon-primary h-32 resize-none"
          ></textarea>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name" 
              className="flex-1 bg-white border border-lemon-bg-dark/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lemon-primary" 
            />
            <input 
              type="password" 
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password" 
              className="flex-1 bg-white border border-lemon-bg-dark/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lemon-primary" 
            />
          </div>
          <button 
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-lemon-text text-white py-3 rounded-2xl font-bold hover:bg-black transition-colors disabled:opacity-50"
          >
            {submitting ? 'Posting...' : 'Post Message'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          <p className="text-center text-lemon-text/60">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-lemon-text/60">아직 작성된 방명록이 없습니다. 첫 글을 남겨보세요!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white/40 p-6 rounded-2xl border border-white/60 shadow-sm hover:bg-white/60 transition-colors">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">{post.name}</span>
                  <span className="text-xs text-lemon-text/40">{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <button 
                  onClick={() => handleDelete(post.id, post.password)}
                  className="text-xs text-red-400 hover:text-red-600 font-medium px-2 py-1 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
              <p className="whitespace-pre-wrap text-lemon-text/80">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Guestbook;
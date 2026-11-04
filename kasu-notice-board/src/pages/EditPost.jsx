import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { supabase } from '../assets/lib/supabaseClient';


export function EditPost() {
  const {noticeId} = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const fetchNotice = async () => {
      const {data, error} = await supabase
        .from('notices')
        .select()
        .eq('id', noticeId)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setTitle(data.title)
        setBody(data.body)
        console.log(data);
      }
    }

    fetchNotice();
  }, [noticeId, navigate])

  return (
    <>
      <div>Edit - {noticeId}</div>
    </>
  );
}

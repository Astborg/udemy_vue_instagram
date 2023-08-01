import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://socstmozqpmisuoretdm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvY3N0bW96cXBtaXN1b3JldGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1ODc2MDIsImV4cCI6MjAwNTE2MzYwMn0.3Az2ngfUtbXtEY-tYvny49lPHA4alJk3yvIOuufEwhA'

export const supabase = createClient(supabaseUrl, supabaseKey)


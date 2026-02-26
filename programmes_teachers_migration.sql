-- SQL Migration Script for Programmes and Teachers Tables
-- Run this in your Supabase SQL Editor

-- Create programmes table
CREATE TABLE IF NOT EXISTS programmes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    stream VARCHAR(50) NOT NULL CHECK (stream IN ('natural', 'social')),
    grade_level VARCHAR(50) NOT NULL, -- e.g., "Grade 10", "Grade 11", "Grade 12"
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add exam scheduling columns to programmes table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'programmes' AND column_name = 'exam_date'
    ) THEN
        ALTER TABLE programmes ADD COLUMN exam_date DATE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'programmes' AND column_name = 'start_time'
    ) THEN
        ALTER TABLE programmes ADD COLUMN start_time TIME;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'programmes' AND column_name = 'end_time'
    ) THEN
        ALTER TABLE programmes ADD COLUMN end_time TIME;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'programmes' AND column_name = 'duration'
    ) THEN
        ALTER TABLE programmes ADD COLUMN duration INTEGER;
    END IF;
END $$;

-- Create index on programmes for exam scheduling
CREATE INDEX IF NOT EXISTS idx_programmes_exam_date ON programmes(exam_date);

-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    subjects TEXT[] NOT NULL, -- Array of subject names
    programme_id UUID REFERENCES programmes(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on teachers for better performance
CREATE INDEX IF NOT EXISTS idx_teachers_programme_id ON teachers(programme_id);
CREATE INDEX IF NOT EXISTS idx_teachers_status ON teachers(status);
CREATE INDEX IF NOT EXISTS idx_teachers_email ON teachers(email);

-- Add programme_id column to students_1 table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'students_1' AND column_name = 'programme_id'
    ) THEN
        ALTER TABLE students_1 ADD COLUMN programme_id UUID REFERENCES programmes(id) ON DELETE SET NULL;
        CREATE INDEX IF NOT EXISTS idx_students_1_programme_id ON students_1(programme_id);
    END IF;
END $$;

-- Insert some sample programmes (run this only once)
INSERT INTO programmes (name, description, stream, grade_level, status) VALUES
('Natural Sciences - Grade 10', 'Grade 10 Natural Sciences programme covering Physics, Chemistry, Biology, Mathematics', 'natural', 'Grade 10', 'active'),
('Natural Sciences - Grade 11', 'Grade 11 Natural Sciences programme covering advanced Physics, Chemistry, Biology, Mathematics', 'natural', 'Grade 11', 'active'),
('Natural Sciences - Grade 12', 'Grade 12 Natural Sciences programme preparing for university entrance exams', 'natural', 'Grade 12', 'active'),
('Social Sciences - Grade 10', 'Grade 10 Social Sciences programme covering History, Geography, Economics, English', 'social', 'Grade 10', 'active'),
('Social Sciences - Grade 11', 'Grade 11 Social Sciences programme covering advanced History, Geography, Economics, English', 'social', 'Grade 11', 'active'),
('Social Sciences - Grade 12', 'Grade 12 Social Sciences programme preparing for university entrance exams', 'social', 'Grade 12', 'active')
ON CONFLICT DO NOTHING;

-- Insert some sample teachers (run this only once)
INSERT INTO teachers (name, email, phone, subjects, programme_id, status) VALUES
('Dr. Abebe Kebede', 'abebe.kebede@school.edu', '+251911123456', ARRAY['Physics', 'Mathematics'], (SELECT id FROM programmes WHERE name = 'Natural Sciences - Grade 12' LIMIT 1), 'active'),
('Ms. Sara Mengistu', 'sara.mengistu@school.edu', '+251911234567', ARRAY['Chemistry', 'Biology'], (SELECT id FROM programmes WHERE name = 'Natural Sciences - Grade 12' LIMIT 1), 'active'),
('Mr. Dawit Tadesse', 'dawit.tadesse@school.edu', '+251911345678', ARRAY['English', 'Literature'], (SELECT id FROM programmes WHERE name = 'Social Sciences - Grade 12' LIMIT 1), 'active'),
('Mrs. Helen Assefa', 'helen.assefa@school.edu', '+251911456789', ARRAY['History', 'Geography'], (SELECT id FROM programmes WHERE name = 'Social Sciences - Grade 11' LIMIT 1), 'active'),
('Mr. Mulugeta Bekele', 'mulugeta.bekele@school.edu', '+251911567890', ARRAY['Economics', 'Civics'], (SELECT id FROM programmes WHERE name = 'Social Sciences - Grade 10' LIMIT 1), 'active')
ON CONFLICT (email) DO NOTHING;

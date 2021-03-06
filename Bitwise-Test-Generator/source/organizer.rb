require 'fileutils'

class Organizer

	def mkdir path, name
		if(!File.directory?(path + name))
			`mkdir #{path}#{name}`
		end
	end
	
	def rm file
		if(File.exist?(file))
			File.delete(file)
		end
	end
	
	def rm_dir path
		if(File.directory?(path))
			FileUtils.rm_rf(path)
		end
	end

	def setup_base_folders path, count
		i = 0
		while i < count
			mkdir path, i.to_s + "/"
			temp_path = path + i.to_s + "/"
			mkdir temp_path, "questions/"
			mkdir temp_path, "answers/"
			
			mkdir temp_path + "questions/", "html"
			mkdir temp_path + "questions/", "pdf"
			mkdir temp_path + "questions/", "c"
			
			mkdir temp_path + "answers/", "html"
			mkdir temp_path + "answers/", "pdf"
			
			#cp "../templates/questions.css", temp_path + "questions/html/"
			
			i = i + 1
		end
	end
	
	def cp source, dest
		`cp #{source} #{dest}`
	end
	
end

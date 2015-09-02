# Contains methods useful for models that want to do searching
module Searchable
  extend ActiveSupport::Concern

  class_methods do
    def default_settings
      {
        analysis: {
          analyzer: {
            autocomplete: {
              type: 'custom',
              tokenizer: 'standard',
              filter: ['standard', 'lowercase', 'stop', 'kstem', 'ngram']
            }
          },
          filter: {
            ngram: {
              type: 'ngram',
              min_gram: 2,
              max_gram: 5
            }
          }
        }
      }
    end

    # Simple match field search, filtered by current tenant company
    def search(field, term)
      query = match_field(field, term)
      filter = {company_id: ActsAsTenant.current_tenant.id}
      self.__elasticsearch__.search filter_query(query, filter)
    end

    private

    # Builds a ES query for matching
    def match_field(field, query, match_percent='80%')
      raise "Must specify search field" unless field
      base = { match: {} }
      base[:match][field] = {
        query: query,
        minimum_should_match: match_percent
      }
      base
    end

    # Builds a filtered query based on the input query and the filter hash
    def filter_query(query_hash, filter_hash)
      return query_hash unless filter_hash && filter_hash.size > 0

      base = {
        query: {
          filtered: {
            query: query_hash,
            filter: {
              term: {}
            }
          }
        }
      }

      # Right now we only honor the first filter
      (key, value) = filter_hash.first
      base[:query][:filtered][:filter][:term][key] = value
      base
    end
  end
end
